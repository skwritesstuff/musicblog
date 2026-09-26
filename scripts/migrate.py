"""One-time export recovery. Never overwrites an edited Markdown file."""
from pathlib import Path
from lxml import html
import yaml,re,posixpath
R=Path(__file__).resolve().parents[1]
def nodes(d,c):return d.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," '+c+' ")]')
def absolute(v,rel):
 if not v or v.startswith(('/', '#','http:','https:','mailto:','data:','javascript:')):return v
 return '/'+posixpath.normpath(posixpath.join(posixpath.dirname(rel),v))
for p in sorted((R/'original/blog').glob('*.html')):
 dest=R/'src/content/posts'/f'{p.stem}.md'
 if dest.exists():continue
 d=html.fromstring(p.read_text()); main=d.xpath('//main')[0]
 for n in main.xpath('.//script|.//footer'):n.getparent().remove(n)
 for n in main.xpath('.//*[@href or @src]'):
  for a in ['href','src']:
   if n.get(a):n.set(a,absolute(n.get(a),'blog/'+p.name))
 title=nodes(main,'post-title')[0].text_content().strip(); dates=nodes(main,'badge-date');tags=nodes(main,'tag-pill')
 meta={row.xpath('./th')[0].text_content().strip():row.xpath('./td')[0].text_content().strip() for row in main.xpath('.//table//tr[th and td]')}
 arts=main.xpath('.//img/@src');audio=main.xpath('.//audio/@src|.//audio/source/@src');notes=nodes(main,'archive-callout');teaser=next((n.text_content().replace('Historical Significance:','').strip() for n in notes if 'Historical Significance:' in n.text_content()),'')
 data=dict(title=title,artist=meta.get('Featured Artists',''),date=dates[0].text_content().strip() if dates else '',category=tags[0].text_content().strip() if tags else 'Other',audioUrl=audio[0] if audio else '',artwork=arts[0] if arts else '',excerpt=teaser,legacyPath='/blog/'+p.name,metadata=meta)
 # Preserve full exported article markup, including embedded media and source citations.
 for n in nodes(main,'post-header'):
  n.getparent().remove(n)
 # Original header metadata is retained in YAML, including archive URLs below.
 data['sourceLinks']=d.xpath('//main//table//a/@href')
 body=''.join(html.tostring(n,encoding='unicode') for n in main)
 dest.write_text('---\n'+yaml.safe_dump(data,allow_unicode=True,sort_keys=False)+'---\n\n'+body)
print('Recovered',len(list((R/'src/content/posts').glob('*.md'))),'Markdown posts')
# Retain the existing Story, then place new milestones ahead of archive credits.
p=R/'src/content/pages/story.md'
if not p.exists():
 d=html.fromstring((R/'original/story.html').read_text());main=d.xpath('//main')[0]
 for n in main.xpath('.//script|.//footer'):n.getparent().remove(n)
 for n in main.xpath('.//*[@href or @src]'):
  for a in ['href','src']:
   if n.get(a):n.set(a,absolute(n.get(a),'story.html'))
 content=''.join(html.tostring(n,encoding='unicode') for n in main)
 milestones=(R/'src/content/pages/milestones.md').read_text().replace('hundreds of organic backlinks','dozens of organic backlinks').replace('artist curation and development.','artist curation, development, and independent music distribution.')
 p.write_text('---\ntitle: The Story\n---\n\n'+content+'\n\n'+milestones)
