// GitHub App OAuth for Decap. Credentials stay in Cloudflare's encrypted secrets.
const ORIGIN = 'https://shameis.com';
const CALLBACK = `${ORIGIN}/cms/callback`;
const REPOSITORY = 'skwritesstuff/musicblog';
const REPOSITORY_ID = 1389267275;
const USER_ID = 110862146;
const COOKIE = '__Host-shameis-cms-state';
const TTL = 600;
const encoder = new TextEncoder();
const base64url = bytes => btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const unbase64 = text => Uint8Array.from(atob(text.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
const random = () => base64url(crypto.getRandomValues(new Uint8Array(32)));
const cookie = (value, age = TTL) => `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const headers = {'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff'};
const jsonForScript = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('\u2028', '\\u2028').replaceAll('\u2029', '\\u2029');

async function key(secret) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(`shameis-cms-state-v1:${secret}`));
  return crypto.subtle.importKey('raw', digest, 'AES-GCM', false, ['encrypt', 'decrypt']);
}
export async function seal(data, secret) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({name:'AES-GCM', iv}, await key(secret), encoder.encode(JSON.stringify(data)));
  return `${base64url(iv)}.${base64url(new Uint8Array(encrypted))}`;
}
export async function unseal(value, secret) {
  const [iv, body] = value.split('.');
  const decrypted = await crypto.subtle.decrypt({name:'AES-GCM', iv:unbase64(iv)}, await key(secret), unbase64(body));
  return JSON.parse(new TextDecoder().decode(decrypted));
}
function guard(request, env) {
  if (new URL(request.url).origin !== ORIGIN) return new Response('Open the editor at https://shameis.com/admin/.', {status:403, headers});
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return new Response('The editor sign-in is still being configured. Please try again after setup is complete.', {status:503, headers});
}
function finish(status, data) {
  const nonce = random();
  const message = `authorization:github:${status}:${JSON.stringify(data)}`;
  const body = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shame Is editor sign-in</title><body><p>${status === 'success' ? 'Sign-in complete. Returning to the editor…' : 'Sign-in could not be completed. Return to the editor and try again.'}</p><script nonce="${nonce}">const origin=${jsonForScript(ORIGIN)};const message=${jsonForScript(message)};function receive(event){if(event.origin!==origin||event.source!==window.opener||event.data!=='authorizing:github')return;window.removeEventListener('message',receive);window.opener.postMessage(message,origin);}window.addEventListener('message',receive);if(window.opener)window.opener.postMessage('authorizing:github',origin);</script></body></html>`;
  return new Response(body, {headers:{...headers,'Content-Type':'text/html; charset=utf-8','Set-Cookie':cookie('',0),'Content-Security-Policy':`default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`}});
}
export async function startAuth({request, env}, now = Date.now()) {
  const blocked = guard(request, env);
  if (blocked) return blocked;
  const input = new URL(request.url);
  if (input.searchParams.get('provider') !== 'github' || (input.searchParams.has('site_id') && input.searchParams.get('site_id') !== 'shameis.com')) return new Response('Invalid sign-in request.', {status:400, headers});
  const state = random();
  const verifier = random();
  const challenge = base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(verifier))));
  const value = await seal({state, verifier, expires:now + TTL * 1000}, env.GITHUB_CLIENT_SECRET);
  const target = new URL('https://github.com/login/oauth/authorize');
  target.search = new URLSearchParams({client_id:env.GITHUB_CLIENT_ID,redirect_uri:CALLBACK,state,code_challenge:challenge,code_challenge_method:'S256',login:'skwritesstuff',allow_signup:'false'}).toString();
  return new Response(null, {status:302,headers:{...headers,Location:target.href,'Set-Cookie':cookie(value)}});
}
export async function finishAuth({request, env}, fetcher = fetch, now = Date.now()) {
  const blocked = guard(request, env);
  if (blocked) return blocked;
  const input = new URL(request.url);
  const failure = () => finish('error', {message:'GitHub sign-in failed or this account does not have editor access. Please try again.'});
  try {
    const value = request.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length+1);
    if (!value || input.searchParams.has('error')) return failure();
    const session = await unseal(value, env.GITHUB_CLIENT_SECRET);
    if (typeof session.state !== 'string' || typeof session.verifier !== 'string' || !Number.isFinite(session.expires) || session.expires < now || session.expires > now + TTL * 1000 || input.searchParams.get('state') !== session.state || !input.searchParams.get('code')) return failure();
    const response = await fetcher('https://github.com/login/oauth/access_token', {method:'POST', headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code:input.searchParams.get('code'),redirect_uri:CALLBACK,code_verifier:session.verifier,repository_id:REPOSITORY_ID})});
    if (!response.ok) return failure();
    const token = await response.json();
    if (typeof token.access_token !== 'string' || !token.access_token.startsWith('ghu_')) return failure();
    const apiHeaders = {Authorization:`Bearer ${token.access_token}`,Accept:'application/vnd.github+json','User-Agent':'shameis-decap-editor','X-GitHub-Api-Version':'2022-11-28'};
    const userResponse = await fetcher('https://api.github.com/user', {headers:apiHeaders});
    if (!userResponse.ok || (await userResponse.json()).id !== USER_ID) return failure();
    const repoResponse = await fetcher(`https://api.github.com/repos/${REPOSITORY}`, {headers:apiHeaders});
    if (!repoResponse.ok) return failure();
    const repo = await repoResponse.json();
    if (repo.id !== REPOSITORY_ID || repo.permissions?.push !== true) return failure();
    // Refresh tokens stay out of the editor. Expired sessions require a fresh sign-in.
    return finish('success', {token:token.access_token,provider:'github'});
  } catch {
    // Never log OAuth codes, tokens, secrets, or upstream error bodies.
    return failure();
  }
}
