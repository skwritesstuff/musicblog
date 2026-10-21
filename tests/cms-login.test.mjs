import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync('public/admin/auth.js','utf8');
function setup(ok=true) {
 let Backend, requests=0, logins=0;
 const window={
  location:{href:'https://shameis.com/admin/?login=complete',hash:''},
  history:{replaceState(){}},
  h:(tag,props,...children)=>({tag,props,children}),
  createClass:definition=>definition,
  CMS:{getBackend:()=>({BackendClass:class{}}),registerBackend:(_,value)=>Backend=value,init(){}}
 };
 vm.runInNewContext(source,{window,URL,fetch:async()=>{requests++;return {ok,json:async()=>({token:'ghu_test',provider:'github'})};}});
 const definition=new Backend().authComponent();
 const mount=()=>{
  const component={...definition,props:{onLogin:()=>{logins++;}},setState(update){Object.assign(this.state,update);}};
  component.state=component.getInitialState();component.componentDidMount();return component;
 };
 return {mount,counts:()=>({requests,logins})};
}
test('redirect login is redeemed once and logging out does not sign the editor back in',async()=>{
 const app=setup();const first=app.mount();assert.equal(first.state.loading,true);
 await new Promise(resolve=>setImmediate(resolve));
 assert.deepEqual(app.counts(),{requests:1,logins:1});
 const afterLogout=app.mount();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(afterLogout.state.loading,false);
 assert.deepEqual(app.counts(),{requests:1,logins:1});
 assert.ok(afterLogout.render().children.some(node=>node?.props?.href==='/cms/auth?provider=github&site_id=shameis.com'));
});
test('failed handoff leaves a usable same-tab retry link',async()=>{
 const app=setup(false);const component=app.mount();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(component.state.loading,false);assert.match(component.state.error,/sign in again/);
 assert.deepEqual(app.counts(),{requests:1,logins:0});
 assert.ok(component.render().children.some(node=>node?.props?.href==='/cms/auth?provider=github&site_id=shameis.com'));
});
