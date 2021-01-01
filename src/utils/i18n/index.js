// TODO: use dynamic import/load in future
import en from './trans/en.json';
import tr from './trans/tr.json';

export { I18N_KEYS } from './keys';

export const localeCodeEn = 'en';
export const localeCodeTr = 'tr';

export const localeCodes = [
  { code: localeCodeEn, name: 'English', pattern: /en.*/i, flag: 'gb' },
  { code: localeCodeTr, name: 'Türkçe',  pattern: /tr.*/i, flag: 'tr' },
];

export const countryOptions = localeCodes.map(({ code, name, flag }) => (
  { key: code, value: code, flag, text: '', content: name }
));

export const translations = {
  [localeCodeEn]: en,
  [localeCodeTr]: tr,
};

export function defaultLocaleCode(localeExpression = '') {
  if (localeExpression && (localeExpression !== '')) {
    const le = localeExpression.toLowerCase();
    const found = localeCodes.find(row => row.code === le || row.pattern.test(localeExpression));
    if (found) return found.code;
  }
  return localeCodeEn;
}

// to match strings like 'my name is {first_name}'
export const VAR_PATTERN = /\{([^\}]+)\}/g;

export function template(txt = '', ctx = null) {
  if (!ctx) return txt;

  const replaceEachWith = (match, name) => {
    if (match && name) {
      if (name in ctx) return ctx[name];
      return `{${name}}`;
    }
    return 'NULL';
  };
  
  return String(txt).replaceAll(VAR_PATTERN, replaceEachWith);
}

export function newI18N(_code = null) {
  console.log('newI18N', _code);
  if (!_code) _code = defaultLocaleCode();
  
  if (!(_code in translations)) {
    throw new Error('unknown locale code: ' + _code);
  }
  
  const _lookup = translations[_code];

  const translate = (key, ctx = null) => {
    return ((key in _lookup) ? template(_lookup[key], ctx) : `[${key}]`);
  }

  const coreProps = ['_code', '_lookup', '_'];

  const i18n = {
    _code,
    _lookup,
    _: translate,
  };

  // extend obj: translations by added methods
  //Object.entries(I18N_KEYS).forEach(([k,v]) => {
  //  obj[k] = (ctx = null) => translate(k, ctx);
  //});

  const handler = {
    // translation by virtual prop access
    get: (target, property) => {
      if (coreProps.includes(property)) return target[property];
      return function(ctx = null) {
        return translate(property, ctx); // artificial method using I18N_KEYS
      }
    },
  };

  return new Proxy(i18n, handler);
}
