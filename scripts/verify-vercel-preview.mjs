import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
const origin=process.env.PREVIEW_URL || 'http://localhost:4173';
const browser=await chromium.launch({channel:'chrome'});
try {
 const page=await browser.newPage();const errors=[];let apiRequests=0;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{apiRequests++;await route.abort();});
 await page.goto(origin+'/login');
 await page.locator('input[name=email]').fill('admin@aionrings.demo');
 await page.locator('input[name=password]').fill('AionDemo2026!');
 await page.getByRole('button',{name:'Sign in',exact:true}).click();
 await page.getByRole('heading',{name:'Ecommerce overview'}).waitFor();
 for(const route of ['/admin/products','/admin/finance/splits','/admin/finance/manufacturers']) {
  await page.goto(origin+route);await page.locator('main h1').waitFor();
  assert.equal(await page.locator('.ad-error-state').count(),0);
 }
 await page.reload();await page.getByRole('heading',{name:'Manufacturers',exact:true}).waitFor();
 await page.goto(origin+'/shop');await page.locator('h1').first().waitFor();
 assert.equal(apiRequests,0);assert.deepEqual(errors,[]);
 console.log('Static Vercel preview passed: demo credentials, deep links, refresh, storefront, no API dependency or browser exceptions.');
}finally{await browser.close();}
