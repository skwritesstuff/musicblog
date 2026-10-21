# Copy editor

Open **https://shameis.com/admin/** and choose **Login with GitHub**. Use the `skwritesstuff` account. There is no separate site password.

Choose **Website copy**, then Homepage, Story, Discoveries, Artwork captions, or Credits. Edit the labeled fields and review the copy preview. On a phone, use **Preview copy** and **Edit copy** to switch between fields and preview. **Publish → Publish now** saves to GitHub and starts the Cloudflare build; the public site updates after that build succeeds. Allow a minute or two, then reload the edited page. The preview focuses on copy; final spacing follows the live responsive layout.

The homepage includes the two supplied brand artworks, image descriptions, captions, search title, and search description. The story also includes search metadata. Story paragraphs support bold, italics, and links. Keep `{{recordCount}}`, `{{imageCount}}`, `{{count}}`, and `{{writers}}` where automatic values are wanted. Use one paragraph per story field. The original 360 post records, archival source URLs, and recovered media files are separate from editable retrospective copy.

The Mac Miller highlight appears on both Homepage and Discoveries; update matching title/date/description in both when revising that highlight. Credits include separate footer and story text, so check both when adding names.

To undo a published edit, reload the editor, change the text back, and publish again. Every publish is also recorded in [GitHub history](https://github.com/skwritesstuff/musicblog/commits/main/). If the site still shows the previous copy, inspect the latest [Cloudflare deployment](https://dash.cloudflare.com/ea12e35abefd586a495e844987afc865/pages/view/musicblog). A failed build leaves the previous successful version live.

## Sign-in setup

The implementation requires a private GitHub App owned by `skwritesstuff`, installed **only** on `skwritesstuff/musicblog`:

- Homepage: `https://shameis.com`
- Callback URL: `https://shameis.com/cms/callback`
- User authorization during installation: disabled (the editor starts its own sign-in flow)
- Expiring user tokens: enabled (default)
- Webhooks: disabled
- Repository permission **Contents: Read and write**; Metadata read access is automatic.
- No organization or account permissions, Actions/Workflows permissions, or private key are needed.
- Install only on the `musicblog` repository.

The public Client ID is configured as `GITHUB_CLIENT_ID` in `wrangler.toml` under `[env.production.vars]`; this file controls runtime variables. Store the generated Client Secret in the Cloudflare Pages `musicblog` project's **Production** environment as encrypted `GITHUB_CLIENT_SECRET`. Never add the secret to source files, build logs, chat, or the CMS config. Redeploy after changing secrets. Preview environments intentionally cannot sign in; production authentication accepts only the canonical `https://shameis.com` host and GitHub user ID `110862146` with push access to repository ID `1389267275`.

OAuth stays in the same browser tab. It uses a 10-minute encrypted HttpOnly state cookie, PKCE, a fixed callback, and a repository-restricted GitHub App user token. The callback redirects to the editor with a separate encrypted HttpOnly handoff cookie that expires after two minutes. The editor redeems it through an origin-checked POST and clears it; no token appears in a URL or callback HTML. The custom login component delegates all repository operations and session storage to Decap’s standard GitHub backend. Client secret and refresh token never enter the browser. The user access token is delivered to Decap, which stores its session in the browser; log out on shared devices. After token expiry, sign in again. App access can be revoked in GitHub's application settings.

## Local verification

Run `npm ci`, `npm run build`, `npm test`, and `npm run check:export`. Serve `out/` locally and run `npm run cms:local` in a second terminal. Open the local `/admin/` URL. `local_backend` connects only on localhost; the proxy binds to `127.0.0.1`, accepts local origins, and edits the local checkout without pushing GitHub. Stop it after testing. Never expose it through a public tunnel.

The CMS bundle is pinned to Decap 3.17.1 with a SHA-384 integrity check. Update both URL and integrity when upgrading. `config.yml` uses JSON syntax, which is valid YAML, to preserve dates as strings. Every editorial field has a corresponding schema entry, including hidden archival references, so saving a form retains the source data.
