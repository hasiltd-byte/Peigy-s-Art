const { chromium } = require(process.env.QA_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.QA_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    const response = await page.goto(process.env.QA_BASE_URL || 'http://localhost:3001/', { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);

    for (const width of [1440, 1024, 800, 700, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Horizontal overflow at ${width}px`);
    }
    console.log('PASS responsive layout: 320–1440px');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('button', { name: 'מקרמה', exact: true }).click();
    assert.equal(await page.locator('.gallery-item').count(), 2);
    await page.locator('.gallery-item').first().click();
    assert(await page.locator('.lightbox').evaluate(element => element.open));
    await page.getByRole('button', { name: 'התמונה הבאה', exact: true }).click();
    assert.equal(await page.locator('.lightbox h3').textContent(), 'לפני הקשר הראשון');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.lightbox').evaluate(element => element.open), false);
    assert(await page.locator('.gallery-item').first().evaluate(element => element === document.activeElement));
    await page.getByRole('button', { name: 'הכול' }).click();
    assert.equal(await page.locator('.gallery-item').count(), 6);
    console.log('PASS gallery filters, modal, navigation, Escape and focus return');

    await page.locator('.add-to-cart').nth(0).click();
    await page.locator('.add-to-cart').nth(2).click();
    assert.equal(await page.locator('.cart-count').textContent(), '2');
    await page.locator('.cart-trigger').click();
    assert(await page.locator('.cart-dialog').evaluate(element => element.open));
    await page.getByRole('button', { name: 'הגדלת כמות: מקרמה עם אופי משלכם', exact: true }).click();
    const checkout = page.locator('.cart-dialog a[href^="https://wa.me/"]');
    const message = new URL(await checkout.getAttribute('href')).searchParams.get('text');
    assert(message.includes('יצירת מקרמה בהזמנה אישית × 2'));
    assert(message.includes('סדנה במתנה × 1'));
    await page.locator('.remove-item').last().click();
    assert.equal(await page.locator('.cart-item').count(), 1);
    await page.getByRole('button', { name: 'הפחתת כמות: מקרמה עם אופי משלכם', exact: true }).click();
    await page.getByRole('button', { name: 'הפחתת כמות: מקרמה עם אופי משלכם', exact: true }).click();
    assert.equal(await page.locator('.cart-empty').count(), 1);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.cart-count').textContent(), '0');
    console.log('PASS shop selection, quantity, removal, empty state and WhatsApp request');

    const slider = page.locator('.rotation-slider input');
    await slider.fill('70');
    assert.equal(await slider.inputValue(), '70');
    assert.equal(await page.locator('.art-turntable').evaluate(element => element.style.getPropertyValue('--art-angle')), '70deg');
    await page.getByRole('button', { name: 'סיבוב אוטומטי', exact: true }).click();
    assert(await page.locator('.art-turntable').evaluate(element => element.classList.contains('auto-rotate')));
    console.log('PASS keyboard-accessible 3D controls');

    await page.locator('.faq-list summary').first().click();
    assert(await page.locator('.faq-list details').first().evaluate(element => element.open));
    await page.evaluate(() => { window.open = url => { window.__qaWhatsapp = String(url); return null; }; });
    await page.getByLabel('שם מלא', { exact: true }).fill('בדיקת אתר');
    await page.getByLabel('טלפון לחזרה', { exact: true }).fill('0501234567');
    await page.getByLabel('מה מסקרן אותך ליצור?', { exact: true }).selectOption('יצירה בהזמנה אישית');
    await page.getByRole('button', { name: 'פתיחת פנייה בוואטסאפ' }).click();
    const contact = await page.evaluate(() => window.__qaWhatsapp);
    assert(new URL(contact).searchParams.get('text').includes('בדיקת אתר'));
    assert(new URL(contact).searchParams.get('text').includes('יצירה בהזמנה אישית'));
    console.log('PASS FAQ and contact form without sending messages');

    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 800) {
      await page.evaluate(value => scrollTo(0, value), y);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(300);
    const broken = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).map(image => image.src));
    assert.deepEqual(broken, []);
    const hashes = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')).filter(href => href.length > 1));
    for (const hash of new Set(hashes)) assert(await page.locator(hash).count(), `Missing anchor ${hash}`);
    assert.deepEqual(errors, []);
    console.log('PASS images, internal anchors, no JavaScript errors');

    fs.mkdirSync('.qa', { recursive: true });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: '.qa/desktop-top.png' });
    await page.screenshot({ path: '.qa/desktop-full.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'פתיחת תפריט', exact: true }).click();
    assert.equal(await page.locator('.mobile-menu').getAttribute('aria-expanded'), 'true');
    await page.locator('.primary-nav').getByRole('link', { name: 'הגלריה', exact: true }).click();
    assert.equal(await page.locator('.mobile-menu').getAttribute('aria-expanded'), 'false');
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: '.qa/mobile-top.png' });
    await page.screenshot({ path: '.qa/mobile-full.png', fullPage: true });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('button', { name: 'עצירת אנימציות', exact: true }).click();
    assert.equal(await page.locator('html').getAttribute('data-motion'), 'paused');
    assert.equal(await page.locator('.marquee-track').evaluate(element => getComputedStyle(element).animationPlayState), 'paused');
    console.log('PASS mobile menu and global pause control');
    await page.locator('.motion-toggle').click();
    await page.locator('.art-stage').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const rotation = () => page.locator('.art-turntable').evaluate(element => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      return Math.atan2(matrix.m31, matrix.m11) * 180 / Math.PI;
    });
    const beforePause = await rotation();
    await page.locator('.rotate-control').click();
    const afterPause = await rotation();
    assert(Math.abs(((afterPause - beforePause + 540) % 360) - 180) < 10, 'Pausing should retain the displayed angle');
    const box = await page.locator('.art-stage').boundingBox();
    const startAngle = Number(await slider.inputValue());
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 70, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    assert(Math.abs(Number(await slider.inputValue()) - startAngle) > 20);
    assert.deepEqual(errors, []);
    console.log('PASS animated frame pause and pointer rotation');
    console.log('ALL CHECKS PASSED. Screenshots saved in .qa/');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
