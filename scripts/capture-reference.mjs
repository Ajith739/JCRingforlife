import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const origin='https://phoenix-react-alt.prium.me';
const target=(await (await fetch('http://127.0.0.1:9222/json')).json()).find(t=>t.url.startsWith(origin));
const ws=new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const q=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){q.get(m.id)?.(m.result);q.delete(m.id)}});
const send=(method,params={})=>new Promise(r=>{q.set(++id,r);ws.send(JSON.stringify({id,method,params}))});
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const routes=[['products','/apps/e-commerce/admin/products'],['add-product','/apps/e-commerce/admin/add-product'],['orders','/apps/e-commerce/admin/orders'],['order-details','/apps/e-commerce/admin/order-details'],['customers','/apps/e-commerce/admin/customers'],['customer-details','/apps/e-commerce/admin/customer-details'],['login','/pages/authentication/split/sign-in'],['forgot-password','/pages/authentication/simple/forgot-password'],['reset-password','/pages/authentication/simple/reset-password'],['lock-screen','/pages/authentication/simple/lock-screen'],['403','/pages/errors/403'],['404','/pages/errors/404'],['500','/pages/errors/500'],['coming-soon','/pages/coming-soon']];
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
for(const [name,path] of routes){
 await send('Page.navigate',{url:origin+path});await new Promise(r=>setTimeout(r,1100));
 await fs.writeFile(`docs/evidence/phoenix-${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
 const info=await ev(`({url:location.href,text:document.body.innerText.slice(0,24000),controls:[...document.querySelectorAll('input,button,select')].map(e=>({tag:e.tagName,type:e.type,text:e.textContent?.trim().slice(0,80),placeholder:e.placeholder})),styles:[...document.querySelectorAll('h1,h2,h3,label,th,td,button')].slice(-25).map(e=>{let s=getComputedStyle(e);return {tag:e.tagName,font:s.fontSize,weight:s.fontWeight,color:s.color,bg:s.backgroundColor,radius:s.borderRadius,padding:s.padding}})})`);
 await fs.writeFile(`docs/evidence/phoenix-${name}-visible.json`,JSON.stringify(info,null,2));
 const evidence=execFileSync('rea',['inspect-web-page','http://127.0.0.1:9222',target.id,'--include-accessibility-text','--json'],{env:{...process.env,REA_BROWSER_OBSERVE_ENABLED:'true',REA_BROWSER_CDP_ENDPOINTS_JSON:'["http://127.0.0.1:9222"]',REA_BROWSER_ALLOWED_ORIGINS_JSON:JSON.stringify([origin])},maxBuffer:20*1024*1024});
 await fs.writeFile(`docs/evidence/phoenix-${name}-rea.json`,evidence);console.log(name,info.url);
}
await send('Page.navigate',{url:origin});await new Promise(r=>setTimeout(r,1000));
await ev(`document.querySelector('[title="Toggle theme"]')?.click()`);
await fs.writeFile('docs/evidence/phoenix-controls.json',JSON.stringify(await ev(`({buttons:[...document.querySelectorAll('button,a')].filter(e=>e.closest('.navbar-top')||e.textContent.includes('Collapsed View')).map(e=>({tag:e.tagName,text:e.textContent,title:e.title,aria:e.getAttribute('aria-label'),class:e.className})),theme:document.documentElement.getAttribute('data-bs-theme')})`),null,2));
ws.close();
