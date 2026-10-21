import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=path=>JSON.parse(readFileSync(path,'utf8'));
const config=read('public/admin/config.yml');
function checkFields(data,fields,path){
 const names=fields.map(f=>f.name);
 for(const [name,value] of Object.entries(data)){
  assert.ok(names.includes(name),`${path}.${name} must survive editor serialization`);
  const field=fields.find(f=>f.name===name);
  if(field.widget==='object')checkFields(value,field.fields,`${path}.${name}`);
  if(field.widget==='list'&&field.fields)for(const item of value)checkFields(item,field.fields,`${path}.${name}`);
 }
}
test('CMS schema preserves every key in each live editorial file',()=>{
 for(const file of config.collections[0].files)checkFields(read(file.file),file.fields,file.name);
 assert.equal(config.backend.repo,'skwritesstuff/musicblog');
 assert.equal(config.backend.branch,'main');
 assert.ok(!JSON.stringify(config).includes('archivePosts.json'));
});
test('original recovered catalog is untouched by the editorial migration',()=>{
 const bytes=readFileSync('src/data/archivePosts.json');
 assert.equal(read('src/data/archivePosts.json').length,360);
 assert.equal(createHash('sha256').update(bytes).digest('hex'),'f709411abd634caed660c9562dac6c80bc433eb43129cd9059e0acb323393b33');
});
test('Mac highlights match and Mike Posner links to the actual earliest salvaged entry',()=>{
 const home=read('src/content/editorial/home.json');
 const discovery=read('src/content/editorial/discoveries.json');
 const mac=discovery.entries.find(x=>x.id==='mac-miller');
 const pick=home.picks.find(x=>x.artist==='Mac Miller');
 for(const key of ['title','date','description'])assert.equal(mac[key],pick[key]);
 assert.equal(mac.readHref,pick.href);
 const mike=discovery.entries.find(x=>x.id==='mike-posner');
 const source=read('src/data/archivePosts.json').find(x=>x.slug===mike.postSlug||`/blog/${x.slug}/`===mike.postSlug||x.href===mike.postSlug);
 assert.ok(source,'Mike Posner must link to a recovered record');
 assert.match(mike.description,/student at Duke/);
 assert.match(mike.description,/not the site’s first post/);
});
