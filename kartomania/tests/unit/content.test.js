import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import siteConfig from '../../src/data/siteConfig.js';
import { KARTS_DATA, RACING_LEVELS, MAX_KART_SPEED_KMH } from '../../src/data/kartsData.js';
import { MULTI_SESSION_PACKAGES, REPEAT_TIERS } from '../../src/data/packagesData.js';
import { FAQ_ITEMS } from '../../src/data/faqData.js';
import { GALLERY_MEDIA } from '../../src/data/galleryData.js';
import { formatPrice, getPrice, getEffectiveRate } from '../../src/utils/pricing.js';
import { formatKartQualification } from '../../src/utils/karts.js';

test('catalogue contains the three confirmed levels and Junior without unconfirmed specifications', () => {
  assert.deepEqual(KARTS_DATA.map((kart) => [kart.name, kart.image]), [
    ['L1', '/karts/kart-yellow.jpg'],
    ['L2', '/karts/kart-blue.jpg'],
    ['L3', '/karts/kart-green.jpg'],
    ['Junior', '/karts/kart-red.jpg']
  ]);
  for (const kart of KARTS_DATA) {
    for (const field of ['badge', 'engine', 'power', 'features', 'eligibility', 'description', 'category', 'title']) {
      assert.equal(Object.hasOwn(kart, field), false, `${kart.name} must not have unconfirmed ${field}`);
    }
  }
  const junior = KARTS_DATA.find((kart) => kart.id === 'junior');
  assert.deepEqual(Object.keys(junior).sort(), ['id', 'image', 'name', 'weekdayPrice', 'weekendPrice']);
});

test('racing levels have the exact confirmed speeds and qualifying laps', () => {
  assert.deepEqual(RACING_LEVELS.map((kart) => [kart.id, kart.level, kart.topSpeedKmh, kart.qualification]), [
    ['l1', 1, 65, undefined],
    ['l2', 2, 85, { kartId: 'l1', lapTimeSeconds: 47 }],
    ['l3', 3, 100, { kartId: 'l2', lapTimeSeconds: 43 }]
  ]);
});

test('qualifying lap descriptions reference the correct previous level without guessing a timing cutoff', () => {
  assert.equal(formatKartQualification(RACING_LEVELS[1].qualification), '47-second lap in L1');
  assert.equal(formatKartQualification(RACING_LEVELS[2].qualification), '43-second lap in L2');
  for (const lapTimeSeconds of [0, -1, NaN, Infinity, '47']) {
    assert.throws(() => formatKartQualification({ kartId: 'l1', lapTimeSeconds }), RangeError);
  }
  assert.throws(() => formatKartQualification({ kartId: 'junior', lapTimeSeconds: 47 }), RangeError);
  assert.throws(() => formatKartQualification(undefined), RangeError);
});

test('site-wide speed and FAQ content match the confirmed catalogue', () => {
  assert.equal(MAX_KART_SPEED_KMH, 100);
  assert.equal(siteConfig.racing.maxSpeedKmh, 100);
  assert.equal(siteConfig.telemetryHighlights.find((item) => item.label === 'TOP SPEED').value, '100 KM/H');
  assert.equal(FAQ_ITEMS.find((item) => item.id === 'kart-levels').answer, 'L1: 65 km/h; L2: 85 km/h; L3: 100 km/h. Junior karts are also available.');
  assert.equal(FAQ_ITEMS.find((item) => item.id === 'qualification').answer, 'To qualify for L2: 47-second lap in L1. To qualify for L3: 43-second lap in L2.');
});

test('all four published kart rates are preserved for both day types', () => {
  assert.deepEqual(KARTS_DATA.map((kart) => [kart.id, getPrice(kart, 'weekday'), getPrice(kart, 'weekend')]), [
    ['l1', 650, 760], ['l2', 1000, 1200], ['l3', 650, 760], ['junior', 650, 760]
  ]);
});

test('all pass prices, bonuses, and validity periods are preserved', () => {
  assert.deepEqual(MULTI_SESSION_PACKAGES.map((pass) => [
    pass.sessions, pass.weekdayPrice, pass.weekendPrice, pass.bonusSessions, pass.bowlingGames, pass.validityMonths
  ]), [
    [5, 3250, 3800, 0, 1, 2], [10, 6500, 7600, 1, 1, 4],
    [15, 9750, 11400, 2, 2, 6], [20, 13000, 15200, 3, 3, 6]
  ]);
  assert.deepEqual(REPEAT_TIERS.map((tier) => tier.price), [880, 820, 740, 680]);
});

test('approximate effective rates include bonus races and respond to day changes', () => {
  assert.deepEqual(MULTI_SESSION_PACKAGES.map((pass) => getEffectiveRate(pass, 'weekday')), [650, 590, 573, 565]);
  assert.deepEqual(MULTI_SESSION_PACKAGES.map((pass) => getEffectiveRate(pass, 'weekend')), [760, 690, 670, 660]);
});

test('prices use Indian currency formatting and reject invalid values', () => {
  assert.equal(formatPrice(13000), '₹13,000');
  assert.equal(formatPrice(0), '₹0');
  for (const value of [NaN, Infinity, -1, '650']) assert.throws(() => formatPrice(value), RangeError);
  assert.throws(() => getPrice(KARTS_DATA[0], 'holiday'), RangeError);
});

test('confirmed duration is preserved and eligibility is not inferred from unverified categories', () => {
  assert.equal(siteConfig.racing.sessionMinutes, 7);
  assert.match(FAQ_ITEMS.find((item) => item.id === 'duration').answer, /7 minutes/);
  assert.equal(FAQ_ITEMS.find((item) => item.id === 'age-height').answer, 'Please contact our team to confirm age and height requirements before booking.');
});

test('every published kart and gallery image exists locally', () => {
  const sources = [
    ...KARTS_DATA.map((kart) => kart.image),
    ...GALLERY_MEDIA.filter((item) => item.type === 'image').map((item) => item.src),
    ...GALLERY_MEDIA.filter((item) => item.type === 'video').map((item) => item.poster)
  ];
  for (const src of sources) {
    assert.ok(existsSync(fileURLToPath(new URL(`../../public${src}`, import.meta.url))), `Missing asset: ${src}`);
  }
});

test('gallery videos are playable MP4 files, not Git LFS pointer text', () => {
  for (const media of GALLERY_MEDIA.filter((item) => item.type === 'video')) {
    const bytes = readFileSync(new URL(`../../public${media.src}`, import.meta.url));
    assert.equal(bytes.subarray(4, 8).toString(), 'ftyp', `Invalid MP4: ${media.src}`);
  }
  const optimized = readFileSync(new URL('../../public/videos/entertainland-racing-720p.mp4', import.meta.url));
  assert.ok(optimized.length < 25 * 1024 * 1024, 'Optimized film must stay below 25 MiB');
});
