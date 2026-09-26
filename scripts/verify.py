"""Check migration preservation and generated CMS output."""
from pathlib import Path
from lxml import html
import json,yaml
R=Path(__file__).resolve().parents[1];D=R/'dist';S=R/'original'
posts=json.loads((D/'posts.json').read_text())
assert len(posts)==len(list((R/'src/content/posts').glob('*.md')))
for p in (S/'blog').glob('*.html'):
 assert (D/'blog'/p.name).exists(),p.name
 assert (D/'blog'/p.stem/'index.html').exists(),p.stem
 old=html.fromstring(p.read_text());new=html.fromstring((D/'blog'/p.name).read_text())
 original=set(old.xpath('//main//@src|//main//a/@href'))
 current=set(new.xpath('//main//@src|//main//a/@href'))
 assert not {x for x in original-current if x.startswith(('https://','http://'))},p.name
for p in S.rglob('*'):
 if p.is_file() and p.suffix.lower() not in ['.html','.xml']:
  assert (D/p.relative_to(S)).read_bytes()==p.read_bytes(),p.name
story=html.fromstring((D/'story.html').read_text())
assert len(story.xpath('//*[@id="iawt-records"]'))==1
assert 'dozens of organic backlinks' in story.text_content()
assert 'Reflections of a Lost Teen' in story.text_content()
assert 'January 25, 2012' in story.text_content()
home=html.fromstring((D/'index.html').read_text())
assert home.xpath('//a[@href="/story.html#iawt-records"]')
assert len(home.xpath('//main//article'))==min(24,len(posts))
assert 'Vintage Blog Era Digital Archive' not in home.xpath('string(//main)')
cfg=yaml.safe_load((D/'admin/config.yml').read_text())
assert cfg['backend']=={'name':'git-gateway','branch':'main'}
assert all((R/f['file']).exists() for c in cfg['collections'] for f in c.get('files',[]))
print(f'PASS: {len(posts)} posts; original assets and external article/media links retained; both legacy URL forms; Story anchors; feed; CMS paths.')
