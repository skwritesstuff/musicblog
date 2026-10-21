# The MuSiK Box & In Audio We Trust

A pure-static Next.js archive — a salvaged retrospective of an underground music blog punching above its weight in the golden era of mixtape culture and pre-algorithm music discovery (2009–2012).

**360** recovered posts · **54** media records · hosted as a frozen static export (Cloudflare Pages / Netlify). No external databases, no CMS, no user accounts.

## Site identity

- **Title:** The MuSiK Box & In Audio We Trust | Pre-Algorithm Music Archive (2009–2012)
- **Routes:** `/` (archive introduction) · `/featured/` · `/archive/` · `/artists/` · `/vault/` · `/story/` (full oral history)
- **Theme:** Singular true black (`#000000`) — no theme toggle
- **Brand assets:** light-surface originals on white (`the-musik-box-banner.png`, `iawt-wordmark-black.png`, `iawt-coin.png`); dark-chrome counterparts (`the-musik-box-banner-dark.png`, `iawt-wordmark-white.png`)
- **Retro Radio:** Visible YouTube IFrame API player (10-track vintage playlist)

## Develop

```sh
npm install
npm run dev
```

## Build (static export → `out/`)

```sh
npm run build
```

`next.config` uses `output: 'export'` and `trailingSlash: true`. Publish **`out/`** (Cloudflare Pages / Netlify). The build also mirrors to `Out/` for older host settings.

### Cloudflare Pages (shameis.com)

Home is the archive introduction at `/`; the full oral history lives at `/story/`, and curated discoveries at `/featured/`.

If production still shows the old archive landing after merging to `main`:

1. Cloudflare Dashboard → Pages → **musicblog** → Settings → Builds  
   - Build command: `npm ci && npm run build`  
   - Build output directory: `out` (lowercase)  
   - Root directory: `/` (repo root)  
   - Production branch: `main`  
   - Environment variable: `NODE_VERSION=20`
2. Deployments → open the failed `main` deploy → **Retry deployment**  
   (or merge a follow-up PR to trigger a fresh production build)

## Data (static only)

| Source | Path |
| --- | --- |
| Posts (360) | `src/data/archivePosts.json` |
| Browsing annotations and derived artists | `src/data/catalogAnnotations.json`, `lib/archive.ts` |
| Uploads / media | `src/data/uploadsRegistry.json`, `src/data/recoveredMedia.json` |
| Credits | `src/data/credits.ts` |
| Site copy | `src/data/siteCopy.json` |

`original/` and legacy Markdown under `src/content/` are historical recovery sources; the live App Router site reads the JSON/TS data above.

## Credits

Founded & Curated by Seamus Kelleher & Myles Snider · Written with Matt, Ben, Helen, Pilo, Lesia, Tricia, Heather, Tim, and other contributors we're surely forgetting (please reach out for proper attribution!).

## Validation

Run `npm test`, `npm run build`, and `npm run check:export`. The filter tests exercise punctuation-safe URL round trips, corpus boundaries, R&B discovery, exact artist filtering, and combined filters. The export check verifies internal links/assets and canonical/share metadata across the generated site.

The build mirrors `out/` into `Out/` only on case-sensitive filesystems. On macOS volumes where these names resolve to the same directory, it leaves the existing export intact.

See [CATALOG_NOTES.md](CATALOG_NOTES.md) for the distinction between preserved recovery data and current browsing annotations.

### Canonical host

Canonical tags, Open Graph URLs, and the sitemap use `https://shameis.com`. A `www` → apex redirect must be configured in Cloudflare Bulk Redirects or Redirect Rules; Pages `_redirects` does not support domain-level redirects. Preserve the path suffix and query string when applying the rule. [Cloudflare setup](https://developers.cloudflare.com/pages/how-to/www-redirect/).

## Copy editing

The Decap editor at `/admin/` manages the live editorial copy. See [Copy editor instructions and setup](docs/COPY-EDITOR.md).
