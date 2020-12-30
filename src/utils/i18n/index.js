// TODO: use dynamic import/load in future
import en from './trans/en.json';
import tr from './trans/tr.json';

export { I18N_KEYS } from './keys';

export const localeCodeEn = 'en';
export const localeCodeTr = 'tr';

export const localeCodes = [
  { code: localeCodeEn, name: 'English', pattern: /en.*/i },
  { code: localeCodeTr, name: 'Türkçe',  pattern: /tr.*/i },
];

export const translations = {
  [localeCodeEn]: en,
  [localeCodeTr]: tr,
};

export function defaultLocaleCode(localeExpression = '') {
  if (localeExpression !== '') {
    const le = localeExpression.toLowerCase();
    const found = localeCodes.find(row => row.code === le || row.pattern.test(localeExpression));
    if (found) return found.code;
  }
  return localeCodeEn;
}

// to match strings like 'my name is {first_name}'
export const VAR_PATTERN = /\{([^\}]+)\}/g;

export function template(txt = '', ctx = {}) {
  const replaceEachWith = (match, name) => match && name ? (name in ctx ? ctx[name] : `{${name}}`) : 'NULL';
  return txt.replaceAll(VAR_PATTERN, replaceEachWith);
}

export function newI18N(_code = null) {
  if (!_code) _code = defaultLocaleCode();
  
  if (!(_code in translations)) {
    throw new Error('unknown locale code: ' + _code);
  }
  
  const _lookup = translations[_code];

  const translate = (key, ctx = {}) => (_lookup[key] ? template(_lookup[key], ctx) : `[${key}]`);

  const i18n = {
    _code,
    _lookup,
    _: translate,
  };

  // extend obj: translations by added methods
  //Object.entries(I18N_KEYS).forEach(([k,v]) => {
  //  obj[k] = (ctx = {}) => translate(k, ctx);
  //});

  const handler = {
    // translation by virtual prop access
    get: (target, property) => {
      if (['_code', '_lookup', '_'].includes(property)) return target[property];
      return function(ctx = {}) {
        return translate(property, ctx); // artificial method using I18N_KEYS
      }
    },
  };
  const i18nProxy = new Proxy(i18n, handler);

  return i18nProxy;
}
