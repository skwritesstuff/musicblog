from pathlib import Path
from lxml import html
from html import escape as e
from urllib.parse import quote
import json,shutil,datetime,re,yaml,mistune,posixpath
R=Path(__file__).resolve().parents[1];O=R/'dist';S=R/'original'
C=json.loads((R/'src/data/siteCopy.json').read_text());md=mistune.create_markdown(escape=False)
if O.exists():shutil.rmtree(O)
shutil.copytree(S,O);shutil.copytree(R/'public',O,dirs_exist_ok=True)
def cls(d,c):return d.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," '+c+' ")]')
def load(p):
 _,front,body=p.read_text().split('---',2);return yaml.safe_load(front),body
posts=[]
for p in (R/'src/content/posts').glob('*.md'):
 f,b=load(p);f['date']=str(f.get('date',''));f['body']=b;f['url']=f.get('legacyPath') or '/blog/'+p.stem+'.html';f['image']=f.get('artwork','');posts.append(f)
posts.sort(key=lambda x:x['date'],reverse=True)
def links(items):return ''.join(f'<a href="{e(i["href"],quote=True)}">{e(i["label"])}</a>' for i in items)
def dt(s):
 try:return datetime.date.fromisoformat(s[:10]).strftime('%B %-d, %Y')
 except ValueError:return s
base=html.fromstring((S/'index.html').read_text());radio=html.tostring(cls(base,'vintage-player-bar')[0],encoding='unicode')
radio_scripts=''.join(html.tostring(n,encoding='unicode') for n in base.xpath('//script') if 'const playlist =' in (n.text or ''))
# Keep the original radio controls and playlist; its embeds remain third-party streams.
radio=radio.replace('PLAY RETRO RADIO',e(C['radioPlay'])).replace('PAUSE RADIO',e(C['radioPause']))
radio_scripts=radio_scripts.replace('PLAY RETRO RADIO',C['radioPlay']).replace('PAUSE RADIO',C['radioPause'])
def header():
 groups=''.join('<div class="channel-group"><strong>'+e(g['label'])+'</strong><div>'+''.join('<a href="/search.html?category='+quote(i['query'])+'">'+e(i['label'])+'</a>' for i in g['links'])+'</div></div>' for g in C['channels'])
 return radio+'<header class="masthead"><div class="container"><a class="wordmark" href="/" aria-label="'+e(C['brand'])+'"><img src="/branding/iawt-2011.png" alt="'+e(C['brand'])+'"></a><nav class="utility">'+links(C['utilityLinks'])+'</nav><nav class="social">'+links(C['socialLinks'])+'</nav></div></header><nav class="channels" aria-label="'+e(C['channelsLabel'])+'"><div class="container channel-inner">'+groups+'<div class="channel-special"><a href="/artists/index.html">'+e(C['artistsLabel'])+'</a><a href="/search.html?category=Mix">'+e(C['mixesLabel'])+'</a></div><form action="/search.html" class="channel-search"><label for="channel-query">'+e(C['searchLabel'])+'</label><div><input id="channel-query" name="q" type="search"><button aria-label="'+e(C['searchTitle'])+'">»</button></div></form></div></nav>'
def footer():return '<footer class="footer container"><p>'+e(C['footerText'])+'</p><p>'+e(C['archiveNotice'])+'</p><nav>'+links(C['footerLinks'])+'</nav></footer>'
def layout(title,body,scripts=''):
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+e(title)+' | '+e(C['title'])+'</title><link rel="stylesheet" href="/styles/2011.css"><link rel="alternate" type="application/rss+xml" href="/rss.xml"></head><body>'+header()+'<main class="container">'+body+'</main>'+footer()+radio_scripts+scripts+'<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script><script>if(window.netlifyIdentity){window.netlifyIdentity.on("init",u=>{if(!u)window.netlifyIdentity.on("login",()=>location.href="/admin/")})}</script></body></html>'
def write(url,txt):
 p=O/url.lstrip('/');p.parent.mkdir(parents=True,exist_ok=True);p.write_text(txt)
def card(r):
 art=('<a class="feed-art" href="'+e(r['url'])+'"><img loading="lazy" src="'+e(r['image'],quote=True)+'" alt="'+e(r['title'],quote=True)+'"></a>') if r['image'] else ''
 if not art and r.get('audioUrl'):art='<audio controls preload="none" src="'+e(r['audioUrl'],quote=True)+'"></audio>'
 excerpt=r.get('excerpt') or ''
 return '<article class="feed-post"><a class="category" href="/search.html?category='+quote(r['category'])+'">[ '+e(r['category'])+' ]</a><h2><a href="'+e(r['url'])+'">'+e(r['title'])+'</a></h2><p class="post-date">'+e(C['publishedLabel'])+' '+e(dt(r['date']))+'</p><div class="post-preview">'+art+'<div><p>'+e(excerpt)+'</p><a href="'+e(r['url'])+'" aria-label="'+e(C['readMoreLabel']+' '+r['title'],quote=True)+'">»</a></div></div></article>'
# Restyle every legacy route while preserving its content, scripts, and destinations.
for p in S.rglob('*.html'):
 rel=p.relative_to(S).as_posix()
 if rel.startswith('blog/') or rel in ['index.html','story.html','story/index.html','search.html','search/index.html']:continue
 d=html.fromstring(p.read_text()); mains=d.xpath('//main')
 if not mains:continue
 main=mains[0]
 for n in main.xpath('.//footer|.//script'):
  n.getparent().remove(n)
 for n in main.xpath('.//*[@href or @src]'):
  for a in ['href','src']:
   v=n.get(a)
   if v and not re.match(r'^(?:[a-z]+:|/|#)',v):n.set(a,'/'+posixpath.normpath(posixpath.join(posixpath.dirname(rel),v)))
 content=''.join(html.tostring(n,encoding='unicode') for n in main)
 scripts=''.join(html.tostring(n,encoding='unicode') for n in d.xpath('//script') if 'const playlist =' not in (n.text or '') and 'const themes =' not in (n.text or ''))
 write(rel,layout(d.xpath('string(//title)'),content,scripts))
for r in posts:
 body=md(r['body'])
 art='<img class="article-art" src="'+e(r['image'],quote=True)+'" alt="'+e(r['title'],quote=True)+'">' if r['image'] else ''
 audio='<audio controls preload="none" src="'+e(r['audioUrl'],quote=True)+'"></audio>' if r.get('audioUrl') else ''
 metadata='<details class="archive-metadata"><summary>'+e(C['metadataLabel'])+'</summary><dl>'+''.join('<dt>'+e(str(k))+'</dt><dd>'+e(str(v))+'</dd>' for k,v in r.get('metadata',{}).items())+'</dl>'+''.join('<p><a href="'+e(v,quote=True)+'">'+e(v)+'</a></p>' for v in r.get('sourceLinks',[]))+'</details>'
 article='<article class="article"><a class="category" href="/search.html?category='+quote(r['category'])+'">[ '+e(r['category'])+' ]</a><h1>'+e(r['title'])+'</h1><p class="post-date">'+e(C['publishedLabel'])+' '+e(dt(r['date']))+'</p>'+art+audio+body+metadata+'</article>'
 page=layout(r['title'],article);write(r['url'],page);write('/blog/'+Path(r['url']).stem+'/index.html',page)
for i in range(0,len(posts),24):
 page=i//24+1;nav='<nav class="pagination">'
 if i:nav+='<a href="'+('/' if page==2 else '/feed/'+str(page-1)+'.html')+'">'+e(C['previousLabel'])+'</a>'
 if i+24<len(posts):nav+='<a href="/feed/'+str(page+1)+'.html">'+e(C['archiveLabel'])+'</a>'
 nav+='</nav>';write('index.html' if i==0 else f'feed/{page}.html',layout(C['title'],('<p>'+e(C['homeBlurb'])+'</p>' if C['homeBlurb'] else '')+''.join(card(r) for r in posts[i:i+24])+nav))
for p in (R/'src/content/pages').glob('*.md'):
 if p.name=='milestones.md':continue
 f,b=load(p);content=md(b)
 if p.stem=='story':content='<p>'+e(C['storyBlurb'])+'</p>'+content
 page=layout(f['title'],content);write(p.stem+'.html',page);write(p.stem+'/index.html',page)
search=layout(C['searchTitle'],'<h1>'+e(C['searchTitle'])+'</h1><p>'+e(C['searchBlurb'])+'</p><p id="result-count" aria-live="polite"></p><div id="search-results"></div>','<script src="/search.js" defer></script>')
write('search.html',search);write('search/index.html',search)
write('contact.html',layout(C['contactTitle'],'<h1>'+e(C['contactTitle'])+'</h1><p>'+e(C['contactBlurb'])+'</p><a href="/story.html">'+e(C['storyTitle'])+' »</a>'))
(O/'posts.json').write_text(json.dumps([{k:v for k,v in r.items() if k!='body'} for r in posts],ensure_ascii=False));(O/'siteCopy.json').write_text(json.dumps(C,ensure_ascii=False))
# Rebuild RSS so posts published through the CMS enter the feed.
from xml.etree.ElementTree import Element,SubElement,tostring
rss=Element('rss',version='2.0');channel=SubElement(rss,'channel')
for k,v in [('title',C['title']),('link',C['siteUrl']),('description',C['footerText'])]:SubElement(channel,k).text=v
for r in posts:
 item=SubElement(channel,'item')
 for k,v in [('title',r['title']),('link',C['siteUrl']+r['url']),('guid',C['siteUrl']+r['url']),('description',r.get('excerpt',''))]:SubElement(item,k).text=v
(O/'rss.xml').write_bytes(tostring(rss,encoding='utf-8',xml_declaration=True))
print(f'Built {len(posts)} Markdown posts, {len(list(O.rglob("*.html")))} HTML routes.')
# Indexes are built from Markdown too, so CMS-created posts appear everywhere.
archive=layout(C['archiveTitle'],'<h1>'+e(C['archiveTitle'])+'</h1>'+''.join(card(r) for r in posts))
write('archive.html',archive);write('archive/index.html',archive)
for kind,key,title in [('artists','artist',C['artistsTitle']),('categories','category',C['categoriesTitle'])]:
 labels=sorted(set(r.get(key,'') for r in posts if r.get(key)))
 body='<h1>'+e(title)+'</h1><ul>'+''.join('<li><a href="/search.html?'+('q' if key=='artist' else 'category')+'='+quote(x)+'">'+e(x)+'</a></li>' for x in labels)+'</ul>'
 write(kind+'/index.html',layout(title,body))
