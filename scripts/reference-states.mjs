import puppeteer from 'puppeteer-core';import fs from 'node:fs/promises';
const browser=await puppeteer.connect({browserURL:'http://127.0.0.1:9222',defaultViewport:null});
const page=(await browser.pages()).find(p=>p.url().startsWith('https://phoenix-react-alt.prium.me'));
await page.goto('https://phoenix-react-alt.prium.me/',{waitUntil:'domcontentloaded'});
await page.setViewport({width:1440,height:1000});

await page.evaluate(()=>document.querySelector('.navbar-vertical-toggle')?.click());
await page.screenshot({path:'docs/phoenix-evidence/phoenix-collapsed.png'});
await fs.writeFile('docs/phoenix-evidence/phoenix-collapsed-visible.json',JSON.stringify(await page.evaluate(()=>({nav:[...document.querySelectorAll('nav')].map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),text:document.body.innerText.slice(0,2000)})),null,2));
await page.evaluate(()=>document.querySelector('.navbar-vertical-toggle')?.click());
await page.evaluate(()=>document.querySelector('.navbar-top button')?.click());await new Promise(r=>setTimeout(r,250));
await page.screenshot({path:'docs/phoenix-evidence/phoenix-dark.png'});
await fs.writeFile('docs/phoenix-evidence/phoenix-dark-visible.json',JSON.stringify(await page.evaluate(()=>({theme:document.documentElement.getAttribute('data-bs-theme'),bodyColor:getComputedStyle(document.body).color,background:getComputedStyle(document.body).backgroundColor})),null,2));
await page.evaluate(()=>document.querySelector('.navbar-top button')?.click());
for(const width of [1024,768,390]){await page.setViewport({width,height:900});await page.screenshot({path:`docs/phoenix-evidence/phoenix-${width}.png`});}
await page.setViewport({width:1440,height:1000});
await page.evaluate(()=>{const input=document.querySelector('.navbar-top input');if(input){input.value='orders';input.dispatchEvent(new Event('input',{bubbles:true}))}});await page.screenshot({path:'docs/phoenix-evidence/phoenix-search.png'});await page.evaluate(()=>{const input=document.querySelector('.navbar-top input');if(input){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}))}});
await browser.disconnect();
