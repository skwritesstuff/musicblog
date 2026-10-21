import test from 'node:test';
import assert from 'node:assert/strict';
import {startAuth,finishAuth,consumeSession,seal,unseal} from '../lib/cms-auth.mjs';
const env={GITHUB_CLIENT_ID:'test-client',GITHUB_CLIENT_SECRET:'test-only-secret'};
const now=1700000000000;
const authContext=(url='https://shameis.com/cms/auth?provider=github&site_id=shameis.com')=>({request:new Request(url),env});
async function flow(){
 const start=await startAuth(authContext(),now);
 const target=new URL(start.headers.get('Location'));
 const cookie=start.headers.get('Set-Cookie').split(';')[0];
 const session=await unseal(cookie.split('=')[1],env.GITHUB_CLIENT_SECRET);
 return {target,cookie,session,context:{request:new Request(`https://shameis.com/cms/callback?state=${target.searchParams.get('state')}&code=test-code`,{headers:{Cookie:cookie}}),env}};
}
const response=x=>new Response(JSON.stringify(x));
function github({user=110862146,repo=1389267275,push=true}={}){
 const calls=[];
 const fetcher=async(url,options)=>{
  calls.push({url,options});
  if(url.endsWith('/access_token')) return response({access_token:'ghu_test-token',refresh_token:'never-return-this'});
  if(url.endsWith('/user'))return response({id:user});
  return response({id:repo,permissions:{push}});
 };
 return {calls,fetcher};
}
test('auth uses PKCE, a short-lived encrypted secure cookie, and fixed callback without broad scopes',async()=>{
 const {target,cookie,session}=await flow();
 assert.equal(target.origin,'https://github.com');
 assert.equal(target.searchParams.get('redirect_uri'),'https://shameis.com/cms/callback');
 assert.equal(target.searchParams.get('code_challenge_method'),'S256');
 assert.equal(target.searchParams.has('scope'),false);
 assert.equal(session.expires,now+600000);
 assert.ok(!cookie.includes(session.verifier));
 const r=await startAuth(authContext(),now);
 for(const value of ['HttpOnly','Secure','SameSite=Lax','Path=/','Max-Age=600'])assert.ok(r.headers.get('Set-Cookie').includes(value));
});
test('auth rejects previews, unknown origins, arbitrary site IDs and missing credentials',async()=>{
 assert.equal((await startAuth(authContext('https://preview.pages.dev/cms/auth?provider=github'))).status,403);
 assert.equal((await startAuth(authContext('https://shameis.com/cms/auth?provider=github&site_id=evil.example'))).status,400);
 assert.equal((await startAuth({...authContext(),env:{}})).status,503);
});
test('expired, tampered, missing and mismatched state never reach GitHub',async()=>{
 const {context,session}=await flow();
 let called=false; const fetcher=()=>{called=true;throw Error('Unexpected fetch');};
 const expired=await finishAuth(context,fetcher,now+600001);
 assert.equal(expired.headers.get('Location'),'https://shameis.com/admin/?login=failed');
 for(const value of ['bad',await seal({...session,state:'wrong'},env.GITHUB_CLIENT_SECRET)]){
  const request=new Request(context.request.url,{headers:{Cookie:`__Host-shameis-cms-state=${value}`}});
  assert.equal((await finishAuth({request,env},fetcher,now)).headers.get('Location'),'https://shameis.com/admin/?login=failed');
 }
 assert.equal((await finishAuth({...context,request:new Request(context.request.url)},fetcher,now)).headers.get('Location'),'https://shameis.com/admin/?login=failed');
 assert.equal(called,false);
});
test('successful auth redirects to the editor with an encrypted short-lived handoff, without a popup or exposed token',async()=>{
 const {context,session}=await flow(); const api=github();
 const r=await finishAuth(context,api.fetcher,now); const body=await r.text();
 const exchange=JSON.parse(api.calls[0].options.body);
 assert.equal(exchange.repository_id,1389267275);
 assert.equal(exchange.code_verifier,session.verifier);
 assert.ok(!body.includes(env.GITHUB_CLIENT_SECRET));
 assert.ok(!body.includes('never-return-this'));
 assert.equal(r.headers.get('Cache-Control'),'no-store');
 assert.equal(r.status,303);
 assert.equal(r.headers.get('Location'),'https://shameis.com/admin/?login=complete');
 assert.equal(body,'');
 assert.ok(![...r.headers].flat().join().includes('ghu_test-token'));
 assert.ok(r.headers.get('Set-Cookie').includes('Max-Age=0'));
 const handoff=r.headers.getSetCookie().find(x=>x.startsWith('__Host-shameis-cms-handoff='));
 for(const value of ['HttpOnly','Secure','SameSite=Strict','Path=/','Max-Age=120'])assert.ok(handoff.includes(value));
 const request=new Request('https://shameis.com/cms/session',{method:'POST',headers:{Origin:'https://shameis.com',Cookie:handoff.split(';')[0]}});
 const redeemed=await consumeSession({request,env},now);
 assert.deepEqual(await redeemed.json(),{token:'ghu_test-token',provider:'github'});
 assert.ok(redeemed.headers.get('Set-Cookie').includes('Max-Age=0'));
 assert.equal(redeemed.headers.get('Cache-Control'),'no-store');
 assert.equal(redeemed.headers.get('Access-Control-Allow-Origin'),null);
});
test('wrong users, missing push permission, wrong repositories and upstream failures get no token',async()=>{
 for(const options of [{user:999},{repo:999},{push:false}]){
  const {context}=await flow();const r=await finishAuth(context,github(options).fetcher,now);
  assert.equal(r.headers.get('Location'),'https://shameis.com/admin/?login=failed');
  assert.ok(r.headers.getSetCookie().every(x=>x.includes('Max-Age=0')));
 }
 const {context}=await flow();
 const r=await finishAuth(context,async()=>{throw Error('private-upstream-detail');},now);
 assert.ok(!(await r.text()).includes('private-upstream-detail'));
});
test('session handoff rejects foreign origins, GET, expiry, tampering, missing cookies and wrong purpose',async()=>{
 const valid={purpose:'editor-handoff',token:'ghu_test-token',expires:now+120000};
 async function redeem(payload=valid,{origin='https://shameis.com',method='POST',time=now}={}) {
  const value=typeof payload==='string'?payload:await seal(payload,env.GITHUB_CLIENT_SECRET);
  return consumeSession({request:new Request('https://shameis.com/cms/session',{method,headers:{Origin:origin,Cookie:`__Host-shameis-cms-handoff=${value}`}}),env},time);
 }
 for(const options of [{origin:'https://evil.example'},{origin:''},{method:'GET'}])assert.equal((await redeem(valid,options)).status,403);
 for(const payload of ['', 'tampered', {...valid,purpose:'oauth-state'}, {...valid,expires:now-1}, {...valid,expires:now+120001}, {...valid,token:'bad-token'}]){
  const r=await redeem(payload);assert.equal(r.status,401);assert.ok(!(await r.text()).includes('ghu_test-token'));
 }
 assert.equal((await redeem(valid,{time:now+120001})).status,401);
 const missing=await consumeSession({request:new Request('https://shameis.com/cms/session',{method:'POST',headers:{Origin:'https://shameis.com'}}),env},now);
 assert.equal(missing.status,401);
});
