# In Audio We Trust / shameis.com

A June 2011-inspired rebuild using the supplied authentic masthead capture. This repository contains 360 recovered posts, original media, Story updates, editable site copy, and Decap CMS configuration.

## Netlify deployment

Connect the existing shameis.com Netlify site to **skwritesstuff/musicblog**, production branch **main**. Use the repository root as the base directory. `netlify.toml` supplies the build command and `dist` publish directory. Deploying this repository does not itself change DNS.

For a manual deployment, build locally and upload the contents of `dist` to Netlify. Manual uploads do not enable CMS Git commits.

## Editing

- Navigation, labels, blurbs and footer: `src/data/siteCopy.json`.
- Posts: `src/content/posts/*.md`.
- Story: `src/content/pages/story.md`.
- Styling: `public/styles/2011.css`.
- Build templates: `scripts/build.py`.
- CMS: `public/admin/config.yml`.

Post frontmatter includes `title`, `artist`, `date` (YYYY-MM-DD, or the recovered partial date), `category`, `audioUrl`, `artwork`, and optional `excerpt`. Do not change an existing post's `legacyPath`: it preserves its public URL. New posts can leave it blank. Media uploads go to `public/uploads`. Recovered post bodies use HTML-compatible Markdown to preserve embedded players and incomplete source markup faithfully. Some records contain only metadata; missing original commentary has not been invented.

## Activate /admin

After linking the repository and deploying, enable Netlify Identity and Git Gateway for the existing site, set registrations to invite-only, and invite the editor account. Open `https://shameis.com/admin/` and accept the invitation. CMS saves commit to `main`; the connected Netlify site must have automatic builds enabled. Authentication and production publishing must be tested on the actual Netlify site; local tests cannot establish those connections.

Backend reference: https://decapcms.org/docs/git-gateway-backend/

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
