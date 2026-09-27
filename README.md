# The MuSiK Box & In Audio We Trust

A pure-static Next.js archive — a salvaged retrospective of an underground music blog punching above its weight in the golden era of mixtape culture and pre-algorithm music discovery (2009–2012).

**360** recovered posts · **54** media records · hosted as a frozen static export (Cloudflare Pages / Netlify). No external databases, no CMS, no user accounts.

## Site identity

- **Title:** The MuSiK Box & In Audio We Trust | Pre-Algorithm Music Archive (2009–2012)
- **Routes:** `/` · `/story/` · `/archive/` · `/artists/` · `/vault/`
- **Brand assets:** `public/images/the-musik-box-banner.png`, `iawt-wordmark-white.png`, `iawt-wordmark-black.png`, `iawt-coin.png`

## Develop

```sh
npm install
npm run dev
```

## Build (static export → `Out/`)

```sh
npm run build
```

`next.config` uses `output: 'export'` and `trailingSlash: true`. Publish the `Out/` directory (see `wrangler.toml` / `netlify.toml`).

## Data (static only)

| Source | Path |
| --- | --- |
| Posts (360) | `src/data/archivePosts.json` |
| Artists | `src/data/artists.json` |
| Uploads / media | `src/data/uploadsRegistry.json`, `src/data/recoveredMedia.json` |
| Credits | `src/data/credits.ts` |
| Site copy | `src/data/siteCopy.json` |

`original/` and legacy Markdown under `src/content/` are historical recovery sources; the live App Router site reads the JSON/TS data above.

## Credits

Founded & Curated by Seamus Kelleher & Myles Snider · Written with Matt, Ben, Helen, Pilo, Lesia, Tricia, Heather, and other contributors we're surely forgetting (please reach out for proper attribution!).
