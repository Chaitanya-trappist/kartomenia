const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

export function formatPrice(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError('A price must be a non-negative, finite number.');
  }
  return rupees.format(value);
}

export function getPrice(item, dayType) {
  if (dayType !== 'weekday' && dayType !== 'weekend') {
    throw new RangeError('Choose weekday or weekend pricing.');
  }
  return item[`${dayType}Price`];
}

export function getEffectiveRate(pass, dayType) {
  return Math.floor(getPrice(pass, dayType) / (pass.sessions + pass.bonusSessions));
}
