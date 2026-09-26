from pathlib import Path
from lxml import html
from html import escape as e
from urllib.parse import quote
import json, shutil, datetime, re, yaml, mistune, posixpath

R = Path(__file__).resolve().parents[1]
O = R / 'dist'
S = R / 'original'
C = json.loads((R / 'src/data/siteCopy.json').read_text())
md = mistune.create_markdown(escape=False)

if O.exists():
    shutil.rmtree(O)
shutil.copytree(S, O)
shutil.copytree(R / 'public', O, dirs_exist_ok=True)


def cls(d, c):
    return d.xpath('.//*[contains(concat(" ", normalize-space(@class), " "), " ' + c + ' ")]')


def load(p):
    _, front, body = p.read_text().split('---', 2)
    return yaml.safe_load(front), body


def prepare_body(body: str) -> str:
    """Dedent archival HTML for mistune; enforce 2009–2012 timeline copy."""
    body = body.replace('2009–2013', '2009–2012').replace('2009-2013', '2009–2012')
    return '\n'.join(line.lstrip() for line in body.splitlines())


def inline_md(text: str) -> str:
    """Parse markdown (including emphasis) to HTML without wrapping leftovers as code."""
    if not text:
        return ''
    text = prepare_body(text)
    # Normalize common emphasis before mistune so ** inside messy HTML still becomes strong.
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text, flags=re.S)
    text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text, flags=re.S)
    return md(text)


def extract_http_links(body: str):
    """Preserve original/Wayback http(s) links required by verify.py."""
    links = []
    seen = set()
    for m in re.finditer(r'https?://[^\s\"\'<>]+', body or ''):
        url = m.group(0).rstrip(').,;]')
        if url in seen:
            continue
        seen.add(url)
        links.append(url)
    return links


def render_post_article(r: dict) -> str:
    """Clean post template from frontmatter — no duplicated archival chrome or raw MD leaks."""
    year = (r.get('date') or '')[:4] or 'Archive'
    teaser = r.get('teaser') or r.get('excerpt') or ''
    body_html = inline_md(teaser)
    http_links = extract_http_links(r.get('body', ''))
    for extra in r.get('sourceLinks') or []:
        if isinstance(extra, str) and extra.startswith('http') and extra not in http_links:
            http_links.append(extra)

    art = (
        '<p><img class="article-art" src="' + e(r['image'], quote=True) + '" alt="' + e(r['title'], quote=True) + '"></p>'
        if r.get('image') else ''
    )
    audio = (
        '<p><audio controls preload="none" src="' + e(r['audioUrl'], quote=True) + '"></audio></p>'
        if r.get('audioUrl') else ''
    )

    sources = ''
    if http_links:
        items = ''.join(
            '<li><a href="' + e(u, quote=True) + '" target="_blank" rel="noopener">' + e(u) + '</a></li>'
            for u in http_links
        )
        sources = '<section class="post-sources"><h2>Original Source &amp; Snapshots</h2><ul>' + items + '</ul></section>'

    artist = r.get('artist') or ''
    artist_line = (
        '<p class="post-artist"><strong>Featured artist:</strong> ' + e(artist) + '</p>' if artist else ''
    )

    return (
        '<div class="container"><article class="post-article">'
        '<nav class="post-breadcrumbs"><a href="/">Home</a> » <a href="/archive.html">Archive</a> » <span>'
        + e(year) + '</span></nav>'
        '<div class="post-meta-row">' + brand_badge(r.get('category', ''))
        + '<span class="badge-date">' + e(str(r.get('date') or '')) + '</span>'
        + '<span class="tag-pill">' + e(r.get('category') or '') + '</span></div>'
        '<h1>' + e(r['title']) + '</h1>'
        + artist_line
        + '<div class="post-body">' + body_html + '</div>'
        + art + audio + sources
        + '<p class="preserve-note"><em>Preserved as part of The MuSiK Box &amp; In Audio We Trust Historical Digital Archive (2009–2012).</em></p>'
        + '<nav class="post-footer-nav"><a href="/archive.html">← Back to Master Archive</a>'
        + '<a href="/search.html">Search All 360 Posts →</a></nav>'
        + '</article></div>'
    )


posts = []
for p in (R / 'src/content/posts').glob('*.md'):
    f, b = load(p)
    f['date'] = str(f.get('date', ''))
    f['body'] = b
    f['url'] = f.get('legacyPath') or '/blog/' + p.stem + '.html'
    f['image'] = f.get('artwork', '')
    posts.append(f)
posts.sort(key=lambda x: x['date'], reverse=True)


def links(items):
    return ''.join(f'<a href="{e(i["href"], quote=True)}">{e(i["label"])}</a>' for i in items)


def dt(s):
    try:
        return datetime.date.fromisoformat(s[:10]).strftime('%B %-d, %Y')
    except ValueError:
        return s


base = html.fromstring((S / 'index.html').read_text())
radio = html.tostring(cls(base, 'vintage-player-bar')[0], encoding='unicode')
site_header = html.tostring(cls(base, 'site-header')[0], encoding='unicode')
site_footer = html.tostring(cls(base, 'site-footer')[0], encoding='unicode')
radio_scripts = ''.join(
    html.tostring(n, encoding='unicode')
    for n in base.xpath('//script')
    if 'const playlist =' in (n.text or '')
)
theme_scripts = ''.join(
    html.tostring(n, encoding='unicode')
    for n in base.xpath('//script')
    if 'const themes =' in (n.text or '') or 'theme-btn' in (n.text or '')
)

# Keep the original radio controls and playlist; its embeds remain third-party streams.
radio = radio.replace('PLAY RETRO RADIO', e(C['radioPlay'])).replace('PAUSE RADIO', e(C['radioPause']))
radio_scripts = radio_scripts.replace('PLAY RETRO RADIO', C['radioPlay']).replace('PAUSE RADIO', C['radioPause'])

# Absolute paths for shared chrome; keep Story + IAWT Records utility anchors for navigation.
def absify_chrome(chunk: str) -> str:
    chunk = chunk.replace('href="index.html"', 'href="/"')
    chunk = chunk.replace('href="story.html"', 'href="/story.html"')
    chunk = chunk.replace('href="archive.html"', 'href="/archive.html"')
    chunk = chunk.replace('href="artists/index.html"', 'href="/artists/index.html"')
    chunk = chunk.replace('href="categories/index.html"', 'href="/categories/index.html"')
    chunk = chunk.replace('href="gallery.html"', 'href="/gallery.html"')
    chunk = chunk.replace('href="search.html"', 'href="/search.html"')
    chunk = chunk.replace('href="rss.xml"', 'href="/rss.xml"')
    chunk = chunk.replace('href="contact.html"', 'href="/contact.html"')
    chunk = chunk.replace('src="logo-dark.png"', 'src="/logo-dark.png"')
    return chunk


site_header = absify_chrome(site_header)
site_footer = absify_chrome(site_footer)
# Ensure verify/home can find the IAWT Records deep link from site copy.
if '/story.html#iawt-records' not in site_header:
    site_header = site_header.replace(
        'href="/story.html"',
        'href="/story.html"',
        1,
    )
    site_header = site_header.replace(
        '<li><a href="/story.html"',
        '<li><a href="/story.html#iawt-records" class="nav-link">★ IAWT Records</a></li>\n            <li><a href="/story.html"',
        1,
    )
# Force Story nav color to accent yellow even when original HTML had inline orange.
site_header = re.sub(
    r'(<a href="/story\.html"[^>]*style=")[^"]*(")',
    r'\1font-weight:700;color:var(--accent-yellow);\2',
    site_header,
)
site_header = site_header.replace('color: var(--accent-orange)', 'color: var(--accent-yellow)')
# Player button vermilion (inline styles in original chrome)
radio = radio.replace('background: var(--accent-orange)', 'background: #e32507')
radio = re.sub(r'background:\s*var\(--accent-orange\)', 'background: #e32507', radio)
radio = radio.replace('rgba(255, 110, 0, 0.4)', 'rgba(227, 37, 7, 0.45)')


def header():
    return radio + site_header


def footer():
    return site_footer


def layout(title, body, scripts=''):
    # Default theme is the black archive palette (avoid light/white flash).
    themes = (
        theme_scripts
        .replace("|| 'light'", "|| 'dark'")
        .replace('|| "light"', '|| "dark"')
        .replace("||'light'", "||'dark'")
    )
    return (
        '<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<meta name="theme-color" content="#000000">'
        '<title>' + e(title) + ' | ' + e(C['title']) + '</title>'
        '<style>html,body{background:#000;color:#fff;}</style>'
        '<link rel="stylesheet" href="/styles/vintage.css">'
        '<link rel="alternate" type="application/rss+xml" href="/rss.xml"></head><body>'
        + header()
        + '<main>' + body + '</main>'
        + footer()
        + radio_scripts
        + themes
        + scripts
        + '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>'
        '<script>if(window.netlifyIdentity){window.netlifyIdentity.on("init",u=>{if(!u)window.netlifyIdentity.on("login",()=>location.href="/admin/")})}</script>'
        '</body></html>'
    )


def write(url, txt):
    p = O / url.lstrip('/')
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(txt)


def brand_badge(category: str) -> str:
    cat = (category or '').lower()
    if 'indie' in cat or 'rock' in cat:
        return '<span class="badge-brand brand-mb">The MuSiK Box</span>'
    return '<span class="badge-brand brand-iawt">In Audio We Trust</span>'


def card(r):
    notes_src = r.get('excerpt') or r.get('teaser') or ''
    # Strip markdown markers for card preview text, keep readable plain copy.
    notes = re.sub(r'[*_`]+', '', notes_src).strip()
    return (
        '<article class="post-card">'
        '<div class="card-meta-top">' + brand_badge(r.get('category', ''))
        + '<span class="badge-date">' + e(str(r['date'])[:7]) + '</span></div>'
        '<h3 class="card-title"><a href="' + e(r['url']) + '">' + e(r['title']) + '</a></h3>'
        + ('<p class="card-notes">' + e(notes) + '</p>' if notes else '')
        + '<div class="card-tags"><a href="/search.html?category=' + quote(r.get('category', ''))
        + '" class="tag-pill">#' + e(r.get('category', '')) + '</a></div></article>'
    )


# Restyle every legacy route while preserving its content, scripts, and destinations.
for p in S.rglob('*.html'):
    rel = p.relative_to(S).as_posix()
    if rel.startswith('blog/') or rel in ['index.html', 'story.html', 'story/index.html', 'search.html', 'search/index.html']:
        continue
    d = html.fromstring(p.read_text())
    mains = d.xpath('//main')
    if not mains:
        continue
    main = mains[0]
    for n in main.xpath('.//footer|.//script'):
        n.getparent().remove(n)
    for n in main.xpath('.//*[@href or @src]'):
        for a in ['href', 'src']:
            v = n.get(a)
            if v and not re.match(r'^(?:[a-z]+:|/|#)', v):
                n.set(a, '/' + posixpath.normpath(posixpath.join(posixpath.dirname(rel), v)))
    content = ''.join(html.tostring(n, encoding='unicode') for n in main)
    scripts = ''.join(
        html.tostring(n, encoding='unicode')
        for n in d.xpath('//script')
        if 'const playlist =' not in (n.text or '') and 'const themes =' not in (n.text or '')
    )
    write(rel, layout(d.xpath('string(//title)'), content, scripts))

for r in posts:
    article = render_post_article(r)
    page = layout(r['title'], article)
    write(r['url'], page)
    write('/blog/' + Path(r['url']).stem + '/index.html', page)

for i in range(0, len(posts), 24):
    page = i // 24 + 1
    nav = '<nav class="pagination" style="display:flex;gap:1rem;margin:2rem 0;">'
    if i:
        nav += '<a href="' + ('/' if page == 2 else '/feed/' + str(page - 1) + '.html') + '">' + e(C['previousLabel']) + '</a>'
    if i + 24 < len(posts):
        nav += '<a href="/feed/' + str(page + 1) + '.html">' + e(C['archiveLabel']) + '</a>'
    nav += '</nav>'
    grid = (
        '<div class="container">'
        + ('<p>' + e(C['homeBlurb']) + '</p>' if C.get('homeBlurb') else '')
        + '<div class="archive-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;">'
        + ''.join(card(r) for r in posts[i:i + 24])
        + '</div>' + nav + '</div>'
    )
    write('index.html' if i == 0 else f'feed/{page}.html', layout(C['title'], grid))

for p in (R / 'src/content/pages').glob('*.md'):
    if p.name == 'milestones.md':
        continue
    f, b = load(p)
    content = md(prepare_body(b))
    if p.stem == 'story':
        content = '<div class="container"><p>' + e(C['storyBlurb']) + '</p>' + content + '</div>'
    else:
        content = '<div class="container">' + content + '</div>'
    page = layout(f['title'], content)
    write(p.stem + '.html', page)
    write(p.stem + '/index.html', page)

search = layout(
    C['searchTitle'],
    '<div class="container"><h1>' + e(C['searchTitle']) + '</h1><p>' + e(C['searchBlurb'])
    + '</p><p id="result-count" aria-live="polite"></p><div id="search-results"></div></div>',
    '<script src="/search.js" defer></script>',
)
write('search.html', search)
write('search/index.html', search)
write(
    'contact.html',
    layout(
        C['contactTitle'],
        '<div class="container"><h1>' + e(C['contactTitle']) + '</h1><p>' + e(C['contactBlurb'])
        + '</p><a href="/story.html">' + e(C['storyTitle']) + ' »</a></div>',
    ),
)

(O / 'posts.json').write_text(json.dumps([{k: v for k, v in r.items() if k != 'body'} for r in posts], ensure_ascii=False))
(O / 'siteCopy.json').write_text(json.dumps(C, ensure_ascii=False))

# Rebuild RSS so posts published through the CMS enter the feed.
from xml.etree.ElementTree import Element, SubElement, tostring

rss = Element('rss', version='2.0')
channel = SubElement(rss, 'channel')
for k, v in [('title', C['title']), ('link', C['siteUrl']), ('description', C['footerText'])]:
    SubElement(channel, k).text = v
for r in posts:
    item = SubElement(channel, 'item')
    for k, v in [
        ('title', r['title']),
        ('link', C['siteUrl'] + r['url']),
        ('guid', C['siteUrl'] + r['url']),
        ('description', r.get('excerpt', '')),
    ]:
        SubElement(item, k).text = v
(O / 'rss.xml').write_bytes(tostring(rss, encoding='utf-8', xml_declaration=True))
print(f'Built {len(posts)} Markdown posts, {len(list(O.rglob("*.html")))} HTML routes.')

# Indexes are built from Markdown too, so CMS-created posts appear everywhere.
archive = layout(
    C['archiveTitle'],
    '<div class="container"><h1>' + e(C['archiveTitle']) + '</h1>'
    + '<div class="archive-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;">'
    + ''.join(card(r) for r in posts)
    + '</div></div>',
)
write('archive.html', archive)
write('archive/index.html', archive)
for kind, key, title in [('artists', 'artist', C['artistsTitle']), ('categories', 'category', C['categoriesTitle'])]:
    labels = sorted(set(r.get(key, '') for r in posts if r.get(key)))
    body = (
        '<div class="container"><h1>' + e(title) + '</h1><ul>'
        + ''.join(
            '<li><a href="/search.html?' + ('q' if key == 'artist' else 'category') + '=' + quote(x) + '">' + e(x) + '</a></li>'
            for x in labels
        )
        + '</ul></div>'
    )
    write(kind + '/index.html', layout(title, body))
