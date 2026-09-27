import assert from 'node:assert/strict';
import test from 'node:test';
import { GROUP_SIZES, buildEnquiryDraft, validateEnquiry } from '../../src/utils/enquiry.js';

const valid = { name: 'Test Racer', phone: '+91 98765 43210', email: '', drivers: GROUP_SIZES[0], message: '' };

test('required details are validated before preparing a draft', () => {
  assert.deepEqual(validateEnquiry(valid), {});
  assert.ok(validateEnquiry({ ...valid, name: '  ' }).name);
  assert.ok(validateEnquiry({ ...valid, name: 'x'.repeat(81) }).name);
  for (const phone of ['', '123', '1234567890123456', 'hello9876543210', '919876543210<script>']) {
    assert.ok(validateEnquiry({ ...valid, phone }).phone, phone);
  }
});

test('email is optional, but invalid email and unknown group sizes are reported', () => {
  assert.deepEqual(validateEnquiry({ ...valid, email: 'racer@example.test', drivers: GROUP_SIZES[3] }), {});
  assert.ok(validateEnquiry({ ...valid, email: 'not-an-email' }).email);
  assert.ok(validateEnquiry({ ...valid, drivers: 'unknown' }).drivers);
  assert.ok(validateEnquiry({ ...valid, message: 'x'.repeat(2001) }).message);
});

test('an enquiry is an encoded draft to the existing business WhatsApp number', () => {
  const data = { ...valid, name: '  Test Racer  ', email: 'racer@example.test', message: 'Can we race at 4? A&B + 2 <friends> 🏁' };
  const draft = buildEnquiryDraft(data);
  const url = new URL(draft.url);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919717548897');
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.searchParams.get('text'), draft.message);
  assert.ok(draft.message.includes('Name: Test Racer\n'));
  assert.ok(draft.message.includes('Email: racer@example.test'));
  assert.ok(draft.message.includes(data.message));
  assert.equal(buildEnquiryDraft(valid).message.includes('Email:'), false);
});

test('invalid details cannot produce a success-shaped draft', () => {
  assert.throws(() => buildEnquiryDraft({ ...valid, phone: 'bad' }), TypeError);
});
