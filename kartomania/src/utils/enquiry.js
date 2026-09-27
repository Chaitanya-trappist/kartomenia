import siteConfig from '../data/siteConfig.js';

export const GROUP_SIZES = ['1–4 drivers', '5–10 drivers', '10–25 drivers', '25+ drivers'];

export function validateEnquiry(data) {
  const errors = {};
  if (!data.name.trim() || data.name.trim().length > 80) {
    errors.name = 'Please enter your name (up to 80 characters).';
  }
  const digits = data.phone.replace(/\D/g, '');
  if (!/^\+?[\d\s().-]+$/.test(data.phone.trim()) || digits.length < 10 || digits.length > 15) {
    errors.phone = 'Enter a phone number with 10–15 digits, including a country code if needed.';
  }
  if (data.email.trim() && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || data.email.length > 254)) {
    errors.email = 'Please enter a valid email address, or leave this field empty.';
  }
  if (!GROUP_SIZES.includes(data.drivers)) {
    errors.drivers = 'Please choose a group size.';
  }
  if (data.message.length > 2000) {
    errors.message = 'Please keep your message under 2,000 characters.';
  }
  return errors;
}

export function buildEnquiryDraft(data) {
  if (Object.keys(validateEnquiry(data)).length) {
    throw new TypeError('Please correct the enquiry details before preparing a message.');
  }
  const message = [
    'Hi Kartomania! I would like to enquire about a visit.',
    '',
    `Name: ${data.name.trim()}`,
    `Phone: ${data.phone.trim()}`,
    ...(data.email.trim() ? [`Email: ${data.email.trim()}`] : []),
    `Group size: ${data.drivers}`,
    ...(data.message.trim() ? ['', data.message.trim()] : [])
  ].join('\n');
  return {
    message,
    url: `${siteConfig.urls.whatsapp}?text=${encodeURIComponent(message)}`
  };
}
