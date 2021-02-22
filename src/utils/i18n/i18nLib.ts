// TODO: use dynamic import/load in future
import { Traduire } from 'traduire';
import { localeCodeEn, localeCodes } from './locales';
import { I18N_TranslationSet, translations } from './translations';

// TODO: detect using browser/agent, cookies, sessionStorage, etc.
export function defaultLocaleCode(localeExpression = '') {
  if (localeExpression && (localeExpression !== '')) {
    const le = localeExpression.toLowerCase();
    const found = localeCodes.find(row => row.code === le || row.pattern.test(localeExpression));
    if (found) return found.code;
  }
  return localeCodeEn;
}

export type I18N_TYPE = Traduire<I18N_TranslationSet>;

export function newI18N(_code = null): I18N_TYPE {
  console.log('newI18N', _code);
  if (!_code) _code = defaultLocaleCode();
  if (!(_code in translations)) {
    throw new Error('unknown locale code: ' + _code);
  }
  const _lookup = translations[_code];
  const i18n: I18N_TYPE = new Traduire<I18N_TranslationSet>(_code, _lookup);
  return i18n;
}
