// GitHub App OAuth for Decap. Credentials stay in Cloudflare's encrypted secrets.
const ORIGIN = 'https://shameis.com';
const CALLBACK = `${ORIGIN}/cms/callback`;
const REPOSITORY = 'skwritesstuff/musicblog';
const REPOSITORY_ID = 1389267275;
const USER_ID = 110862146;
const COOKIE = '__Host-shameis-cms-state';
const HANDOFF_COOKIE = '__Host-shameis-cms-handoff';
const TTL = 600;
const HANDOFF_TTL = 120;
const encoder = new TextEncoder();
const base64url = bytes => btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const unbase64 = text => Uint8Array.from(atob(text.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
const random = () => base64url(crypto.getRandomValues(new Uint8Array(32)));
const cookie = (value, age = TTL) => `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const handoffCookie = (value, age = HANDOFF_TTL) => `${HANDOFF_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;
const headers = {'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff'};
const readCookie = (request, name) => request.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(`${name}=`))?.slice(name.length+1);

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
function finish(status, handoff = '') {
  const resultHeaders = new Headers({...headers, Location:`${ORIGIN}/admin/?login=${status}`});
  resultHeaders.append('Set-Cookie', cookie('',0));
  resultHeaders.append('Set-Cookie', handoffCookie(handoff, handoff ? HANDOFF_TTL : 0));
  return new Response(null, {status:303, headers:resultHeaders});
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
  const resultHeaders = new Headers({...headers,Location:target.href});
  resultHeaders.append('Set-Cookie',cookie(value));
  resultHeaders.append('Set-Cookie',handoffCookie('',0));
  return new Response(null, {status:302,headers:resultHeaders});
}
export async function finishAuth({request, env}, fetcher = fetch, now = Date.now()) {
  const blocked = guard(request, env);
  if (blocked) return blocked;
  const input = new URL(request.url);
  const failure = () => finish('failed');
  try {
    const value = readCookie(request, COOKIE);
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
    const handoff = await seal({purpose:'editor-handoff',token:token.access_token,expires:now + HANDOFF_TTL * 1000},env.GITHUB_CLIENT_SECRET);
    return finish('complete', handoff);
  } catch {
    // Never log OAuth codes, tokens, secrets, or upstream error bodies.
    return failure();
  }
}

// The editor redeems this short-lived, encrypted cookie after a same-tab redirect.
// No access token appears in a URL, callback HTML, or readable cookie.
export async function consumeSession({request, env}, now = Date.now()) {
  const blocked = guard(request, env);
  if (blocked) return blocked;
  if (request.method !== 'POST' || request.headers.get('Origin') !== ORIGIN) return new Response('Invalid session request.', {status:403, headers});
  const resultHeaders = {...headers, 'Content-Type':'application/json', 'Set-Cookie':handoffCookie('',0)};
  try {
    const value = readCookie(request, HANDOFF_COOKIE);
    if (!value) throw Error('No handoff');
    const session = await unseal(value, env.GITHUB_CLIENT_SECRET);
    if (session.purpose !== 'editor-handoff' || typeof session.token !== 'string' || !session.token.startsWith('ghu_') || !Number.isFinite(session.expires) || session.expires < now || session.expires > now + HANDOFF_TTL * 1000) throw Error('Invalid handoff');
    return new Response(JSON.stringify({token:session.token,provider:'github'}), {headers:resultHeaders});
  } catch {
    return new Response(JSON.stringify({message:'Sign-in expired. Please sign in again.'}), {status:401, headers:resultHeaders});
  }
}
