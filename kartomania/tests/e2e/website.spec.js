import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectAccessible(page) {
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(({ id, nodes }) => ({
    rule: id,
    elements: nodes.map(({ target, failureSummary }) => ({ target, failureSummary }))
  }))).toEqual([]);
}

const pages = [
  ['/', 'Race. Feel. Repeat.'],
  ['/experience', 'This is real racing.'],
  ['/karts', 'Choose your ride.'],
  ['/packages', 'Great laps. Clear prices.'],
  ['/about', 'Racing is in our DNA.'],
  ['/gallery', 'See the rush.'],
  ['/contact', 'Your race starts here.'],
  ['/not-a-page', 'Let’s get youback on track.']
];

const disputedKartClaims = /\b(solo|two[\s-]seaters?|2[\s-]seaters?|electric|cadet|tandem|torque|L4)\b/i;

for (const [route, heading] of pages) {
  test(`${route} renders without runtime, accessibility, or overflow regressions`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(heading);
    await expect(page).toHaveTitle(/Kartomania/);
    await expect(page.locator('body')).not.toContainText(disputedKartClaims);
    await expect(page.locator('body')).not.toContainText(/\b75\s*km\/h\b/i);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', disputedKartClaims);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await expectAccessible(page);
    expect(errors).toEqual([]);
  });
}

test('home loads no videos or map frames before a visitor requests them', async ({ page }) => {
  const mediaRequests = [];
  page.on('request', (request) => {
    if (request.url().endsWith('.mp4')) mediaRequests.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('video')).toHaveCount(0);
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(mediaRequests).toEqual([]);
  await expect(page.locator('#main-content')).toContainText('7min');
});

test('prices toggle consistently for every kart and pass', async ({ page, isMobile }) => {
  await page.goto('/packages');
  const kartPrices = page.locator('.race-card-price strong');
  await expect(kartPrices).toHaveText(['₹650 / 7 min', '₹1,000 / 7 min', '₹650 / 7 min', '₹650 / 7 min']);
  if (!isMobile) {
    for (const width of [1440, 1281, 1200, 1024]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      const rowDifferences = await page.locator('.pricing-race-grid .race-card').evaluateAll((cards) => {
        const rows = new Map();
        for (const card of cards) {
          const row = Math.round(card.getBoundingClientRect().top);
          if (!rows.has(row)) rows.set(row, []);
          rows.get(row).push(card.querySelector('.race-card-price strong').getBoundingClientRect().top);
        }
        return [...rows.values()].map((positions) => Math.max(...positions) - Math.min(...positions));
      });
      for (const difference of rowDifferences) expect(difference, `Price alignment at ${width}px`).toBeLessThanOrEqual(1);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await expect(page.locator('.pass-price')).toHaveText(['₹3,250', '₹6,500', '₹9,750', '₹13,000']);
  await page.getByRole('button', { name: 'Weekends & holidays' }).click();
  await expect(kartPrices).toHaveText(['₹760 / 7 min', '₹1,200 / 7 min', '₹760 / 7 min', '₹760 / 7 min']);
  await expect(page.locator('.pass-price')).toHaveText(['₹3,800', '₹7,600', '₹11,400', '₹15,200']);
  await expect(page.locator('.repeat-tier strong')).toHaveText(['₹880', '₹820', '₹740', '₹680']);
  await page.getByRole('link', { name: 'Race passes', exact: true }).click();
  await expect(page).toHaveURL(/#bulk-packages$/);
  await expect(page.locator('#bulk-packages')).toBeFocused();
  await expect(page.locator('.pass-price')).toHaveText(['₹3,800', '₹7,600', '₹11,400', '₹15,200']);
});

test('confirmed kart names, speeds, and qualifying laps appear consistently without invented Junior specs', async ({ page }) => {
  for (const route of ['/', '/karts', '/packages']) {
    await page.goto(route);
    await expect(page.locator('.race-card h3')).toHaveText(['L1', 'L2', 'L3', 'Junior']);
    await expect(page.locator('.kart-speed dd')).toHaveText(['65 km/h', '85 km/h', '100 km/h']);
    await expect(page.locator('.kart-qualification dt')).toHaveText(['Qualify for L2', 'Qualify for L3']);
    await expect(page.locator('.kart-qualification dd')).toHaveText(['47-second lap in L1', '43-second lap in L2']);
    const junior = page.locator('.race-card').filter({ has: page.getByRole('heading', { level: 3, name: 'Junior', exact: true }) });
    await expect(junior.locator('.kart-details')).toHaveCount(0);
    await expect(page.locator('.kart-badge, .kart-description, .kart-specs, .kart-eligibility, .two-racer-note')).toHaveCount(0);
    await expect(page.locator('.race-grid')).not.toContainText(disputedKartClaims);
    await expect(page.locator('.race-grid')).not.toContainText(/For the thrill seekers|Better together|Instant acceleration|For future champions/);
  }
  await page.getByRole('button', { name: 'Search the website' }).click();
  for (const query of ['L1', 'Junior', 'qualify']) {
    await page.getByRole('searchbox', { name: 'Search Kartomania' }).fill(query);
    await expect(page.getByRole('dialog').getByRole('link', { name: 'Our karts L1, L2, L3, Junior' })).toBeVisible();
  }
  for (const query of ['solo', 'two-seater', 'instant torque', 'electric', 'cadet', 'tandem', 'L4']) {
    await page.getByRole('searchbox', { name: 'Search Kartomania' }).fill(query);
    await expect(page.getByRole('dialog').getByRole('link')).toHaveCount(0);
  }
});

test('Junior links work and old L4 bookmarks still reach the renamed card', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-stats > div').filter({ hasText: 'Top speed' }).locator('dd')).toHaveText('100km/h');
  await page.getByRole('link', { name: 'View Junior', exact: true }).click();
  await expect(page).toHaveURL('/karts#junior');
  await expect(page.locator('#junior')).toBeFocused();
  await page.goto('/karts#l4');
  await expect(page.locator('#junior')).toBeFocused();
  await expect(page.locator('#junior h3')).toHaveText('Junior');
});

test('FAQ explains the three levels and their qualifying laps', async ({ page }) => {
  await page.goto('/experience#faq');
  await page.getByText('What kart levels are available?', { exact: true }).click();
  await expect(page.locator('#faq details[open] p')).toHaveText('L1: 65 km/h; L2: 85 km/h; L3: 100 km/h. Junior karts are also available.');
  await page.getByText('How do I qualify for L2 and L3?', { exact: true }).click();
  await expect(page.locator('#faq details[open] p')).toHaveText('To qualify for L2: 47-second lap in L1. To qualify for L3: 43-second lap in L2.');
});

test('search has clear results, no-results feedback, and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Search the website' });
  await trigger.click();
  const search = page.getByRole('searchbox', { name: 'Search Kartomania' });
  await expect(search).toBeFocused();
  await search.fill('   prices  ');
  await expect(page.getByRole('dialog').getByRole('link', { name: /Race prices/ })).toBeVisible();
  await search.fill('no-such-item');
  await expect(page.getByRole('dialog')).toContainText('No matches for');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(search).toHaveValue('');
  await search.fill('height');
  await page.getByRole('link', { name: /Before your first race/ }).click();
  await expect(page).toHaveURL('/experience#faq');
  await expect(page.locator('#faq')).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('gallery filtering, keyboard lightbox navigation, and focus restoration work', async ({ page }) => {
  await page.goto('/gallery');
  await page.getByRole('button', { name: 'Racing', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(2);
  const firstImage = page.getByRole('button', { name: 'View Multi-Kart Drift Chase' });
  await firstImage.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Turn 6 Inside Kerb Attack');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Multi-Kart Drift Chase');
  await expectAccessible(page);
  await page.keyboard.press('Escape');
  await expect(firstImage).toBeFocused();
  await page.getByRole('button', { name: 'Videos', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(2);
  await expect(page.locator('video')).toHaveCount(0);
});

test('video plays on demand and is removed when the dialog closes', async ({ page }) => {
  await page.goto('/gallery');
  await page.getByRole('button', { name: 'Watch Entertainland Gokarting Race Action' }).click();
  const video = page.locator('video');
  await expect(video).toBeVisible();
  await expect.poll(() => video.evaluate((element) => element.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => video.evaluate((element) => element.currentTime)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Close Entertainland Gokarting Race Action' }).click();
  await expect(video).toHaveCount(0);
});

test('a failed video is an explicit error, not an empty player', async ({ page }) => {
  await page.route('**/videos/*.mp4', (route) => route.abort());
  await page.goto('/gallery');
  await page.getByRole('button', { name: 'Watch 720m Circuit Apex Flythrough' }).click();
  await expect(page.getByRole('alert')).toContainText('This video could not be played.');
  await expect(page.getByRole('link', { name: 'open the video directly' })).toHaveAttribute('href', '/videos/kartomania-fpv-aerial.mp4');
});

test('enquiries are validated and prepare an editable draft without claiming delivery', async ({ page }) => {
  await page.goto('/contact#enquiry-form');
  await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
  await expect(page.getByLabel('Your name *')).toBeFocused();
  await expect(page.getByRole('alert').first()).toContainText('Please enter your name');
  await page.getByLabel('Your name *').fill('Test Racer');
  await page.getByLabel('Phone number *').fill('bad');
  await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
  await expect(page.getByLabel('Phone number *')).toBeFocused();
  await page.getByLabel('Phone number *').fill('+91 98765 43210');
  await page.getByLabel('Email (optional)').fill('racer@example.test');
  await page.getByLabel('Group size').selectOption('5–10 drivers');
  await page.getByLabel('What do you have in mind?').fill('Test enquiry: 4 PM & 5 friends.');
  await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Your message is ready.' })).toBeFocused();
  await expect(page.locator('.draft-panel')).toContainText('Nothing has been sent yet.');
  await expect(page.getByText('MESSAGE RECEIVED', { exact: true })).toHaveCount(0);
  const url = new URL(await page.getByRole('link', { name: 'Open WhatsApp & review' }).getAttribute('href'));
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe('/919717548897');
  expect(url.searchParams.get('text')).toContain('Test enquiry: 4 PM & 5 friends.');
  await expectAccessible(page);
  await page.getByRole('button', { name: 'Edit my details' }).click();
  await expect(page.getByLabel('Your name *')).toHaveValue('Test Racer');
  await expect(page.getByLabel('Your name *')).toBeFocused();
});

test('booking uses a single native link rather than opening duplicate tabs', async ({ page, context, isMobile }) => {
  await context.route('https://web.racefacer.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<title>Booking test</title>' }));
  await page.goto('/');
  const booking = isMobile ? page.locator('.mobile-booking-bar .button') : page.locator('.nav-booking');
  await expect(booking).toHaveAttribute('target', '_blank');
  await expect(booking).toHaveAttribute('rel', 'noopener noreferrer');
  const popupPromise = context.waitForEvent('page');
  await booking.click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(context.pages()).toHaveLength(2);
  await popup.close();
});

test('legacy routes retain their target and hash', async ({ page }) => {
  for (const [legacy, target] of [['/track', '/experience'], ['/experiences', '/experience'], ['/price', '/packages'], ['/race', '/packages']]) {
    await page.goto(`${legacy}#faq`);
    await expect(page).toHaveURL(`${target}#faq`);
    await expect(page.locator('#faq')).toBeFocused();
  }
});

test('all sections remain usable at narrow and intermediate widths', async ({ page }) => {
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/packages', '/karts', '/contact']) {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${route} overflows at ${width}px`).toBe(true);
    }
  }
});

test('mobile menu traps focus, closes with Escape, and navigates correctly', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation is only visible below 1000px.');
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Explore Kartomania' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Our karts' }).click();
  await expect(page).toHaveURL('/karts');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('h1')).toHaveText('Choose your ride.');
});

test('the FAQ is keyboard-operable and reduced motion avoids smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/experience#faq');
  const firstQuestion = page.locator('#faq summary').first();
  await firstQuestion.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  await expect(page.locator('#faq details').first()).toContainText('No prior experience');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('Google Maps is an explicit, visitor-controlled load', async ({ page }) => {
  await page.route('https://maps.google.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<title>Map test</title>' }));
  await page.goto('/contact');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Show interactive map' }).click();
  await expect(page.getByTitle('Kartomania at Entertainland Mall on Google Maps')).toBeVisible();
});

test('locally hosted photographs and branding decode without broken assets', async ({ page }) => {
  const failures = [];
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4173/') && response.status() >= 400) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });
  for (const route of ['/', '/gallery']) {
    await page.goto(route);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
  }
  expect(failures).toEqual([]);
});

test('reading text, captions, and controls maintain the readable type scale', async ({ page }) => {
  const checks = [
    ['/', [
      ['.hero-description', 16], ['.hero-footnote', 12], ['.section-description', 16],
      ['.kart-qualification dd', 14], ['.race-card-price small', 12],
      ['.faq-list summary', 16], ['.footer-grid nav a', 14]
    ]],
    ['/packages', [
      ['.pass-card .check-list li', 14], ['.pass-bonus', 14], ['.pass-rate', 12],
      ['.price-toggle button', 14]
    ]],
    ['/contact', [
      ['.form-field label', 14], ['.form-field input', 16], ['.form-field textarea', 16],
      ['.form-intro', 12], ['.form-note', 12]
    ]]
  ];
  for (const [route, selectors] of checks) {
    await page.goto(route);
    for (const [selector, minimum] of selectors) {
      const elements = page.locator(selector);
      await expect(elements.first(), selector).toBeVisible();
      const sizes = await elements.evaluateAll((items) => items.map((item) => parseFloat(getComputedStyle(item).fontSize)));
      for (const size of sizes) expect(size, `${route} ${selector}`).toBeGreaterThanOrEqual(minimum);
    }
    const targets = await page.locator('.button, .icon-button, .price-toggle button, .social-links a, .footer-grid nav a').evaluateAll((items) =>
      items.map((item) => ({ label: item.textContent || item.getAttribute('aria-label'), height: item.getBoundingClientRect().height })).filter((item) => item.height > 0)
    );
    for (const target of targets) expect(target.height, target.label).toBeGreaterThanOrEqual(44);
  }
});

test('day controls identify their prices and announce the selected day type', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('group', { name: 'Choose pricing days' });
  await expect(toggle.getByRole('button', { name: 'Weekdays Mon–Fri' })).toHaveAttribute('aria-controls', 'kart-options');
  await expect(toggle.getByRole('status')).toHaveText('Showing weekday prices.');
  await toggle.getByRole('button', { name: 'Weekends & holidays' }).click();
  await expect(toggle.getByRole('status')).toHaveText('Showing weekend and holiday prices.');
  await expect(page.locator('#kart-options .race-card-price strong')).toHaveText(['₹760 / 7 min', '₹1,200 / 7 min', '₹760 / 7 min', '₹760 / 7 min']);
  const fontFeatures = await page.locator('.race-card-price strong').first().evaluate((element) => getComputedStyle(element).fontVariantNumeric);
  expect(fontFeatures).toContain('tabular-nums');
});

test('the mobile hero booking action stays above the fixed booking bar', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This checks the mobile first-screen layout.');
  for (const viewport of [{ width: 320, height: 740 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const primary = await page.locator('.hero-actions .button').first().boundingBox();
    const fixedBar = await page.locator('.mobile-booking-bar').boundingBox();
    expect(primary.y + primary.height).toBeLessThanOrEqual(fixedBar.y);
    const headingBounds = await page.locator('.hero h1').evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return { contentRight: range.getBoundingClientRect().right, containerRight: heading.getBoundingClientRect().right };
    });
    expect(headingBounds.contentRight).toBeLessThanOrEqual(headingBounds.containerRight + 1);
  }
});

test('the mobile booking bar stays out of the way while completing an enquiry', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The fixed booking bar is only shown on mobile.');
  await page.goto('/contact#enquiry-form');
  const bar = page.locator('.mobile-booking-bar');
  await expect(bar).toBeVisible();
  await page.getByLabel('Your name *').focus();
  await expect(bar).toBeHidden();
  await page.locator('#main-content').focus();
  await expect(bar).toBeVisible();
});
