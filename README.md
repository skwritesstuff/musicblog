# In Audio We Trust / shameis.com

A Vintage digital-rescue archive with Decap CMS. This repository contains 360 recovered posts, original media, Story updates, editable site copy, and Decap CMS configuration.

## Cloudflare Pages deployment (primary)

Production host: **Cloudflare Pages** project `shameis-musicblog`, connected to **skwritesstuff/musicblog**, production branch **main**.

### Pages project settings

| Setting | Value |
|--------|--------|
| Build command | `pip install -r requirements.txt && python scripts/build.py` |
| Build output directory | `dist` |
| Root directory | `/` (repo root) |
| Environment variable | `PYTHON_VERSION` = `3.12` |

`wrangler.toml` sets `pages_build_output_dir = "dist"`. Deploying the repo does not change DNS by itself.

### Custom domain cutover (off Netlify)

Do this in order:

1. **Cloudflare Pages → Custom domains**  
   Add `shameis.com` and `www.shameis.com` to the Pages project. Let Cloudflare create/suggest DNS records (usually a CNAME to `*.pages.dev`). Do **not** point the apex at Netlify’s `75.2.60.5`.

2. **Switch nameservers at WordPress.com** (this is the step that actually leaves Netlify’s DNS path)  
   - Cloudflare → **Overview** for `shameis.com` → copy the two Cloudflare nameservers (`*.ns.cloudflare.com`).  
   - WordPress.com → **Domains** → `shameis.com` → **Name servers** → **Custom name servers**.  
   - Remove `ns1/2/3.wordpress.com`. Paste the two Cloudflare nameservers. Save.  
   - Wait until `dig +short shameis.com NS` shows Cloudflare, not WordPress.

3. **Confirm the site is on Cloudflare**  
   `curl -sI https://shameis.com` should show `server: cloudflare` (not `Netlify`).

4. **Remove Netlify**  
   In Netlify: delete custom domains for this site (or delete the site). Optional: delete `netlify.toml` after cutover is stable.

### CMS note (`/admin`)

`/admin` still uses **Netlify Identity + git-gateway**. That login will stop working once you fully leave Netlify. Editing content after cutover means either:

- commit Markdown / `siteCopy.json` directly in GitHub, or  
- migrate Decap to a GitHub backend (separate follow-up).

## Editing

- Navigation, labels, blurbs and footer: `src/data/siteCopy.json`.
- Posts: `src/content/posts/*.md`.
- Story: `src/content/pages/story.md`.
- Styling: `public/styles/vintage.css`.
- Build templates: `scripts/build.py`.
- CMS: `public/admin/config.yml`.

Post frontmatter includes `title`, `artist`, `date` (YYYY-MM-DD, or the recovered partial date), `category`, `audioUrl`, `artwork`, and optional `excerpt`. Do not change an existing post's `legacyPath`: it preserves its public URL. New posts can leave it blank. Media uploads go to `public/uploads`. Recovered post bodies use HTML-compatible Markdown to preserve embedded players and incomplete source markup faithfully. Some records contain only metadata; missing original commentary has not been invented.

## Build and check

```sh
python -m pip install -r requirements.txt
python scripts/build.py
python scripts/verify.py
python -m http.server 8765 --directory dist
```

`original/` is the unmodified export used to preserve historical assets and ancillary routes. Normal builds read Markdown as the post source of truth. `scripts/migrate.py` documents the initial recovery and should not be rerun for routine editing. `dist/` is generated and excluded from Git.

The masthead uses the recovered transparent 2011 wordmark at `public/branding/iawt-2011.png`. The seal is retained at `public/assets/iawt-seal.jpeg`. The reference capture is not a complete screenshot of the original site's full layout; spacing and responsive behavior follow the supplied design brief. External radio/video links are preserved but their continued availability is controlled by the providers.

Historical milestones follow the publisher's supplied account and citations; the Wayback and Bangers and Mash pages were not accessible for independent verification in this session.
