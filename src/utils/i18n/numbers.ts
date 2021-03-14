export function formatNumber(num: number, localeCode = 'en-GB'): string {
  const nf = new Intl.NumberFormat(localeCode, { maximumSignificantDigits: 3 });
  return nf.format(num);
}

export function formatMoney(num: number, localeCode = 'en-GB', currency: 'GBP'): string {
  const nf = new Intl.NumberFormat(localeCode, { style: 'currency', currency });
  return nf.format(num);
}
