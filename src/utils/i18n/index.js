import { dictionaryEn } from './en';
export * from './keys';

export const codeEn = 'en';
export const codeDe = 'de';
export const codeFr = 'fr';

export const localeCodes = [
  { code: codeEn, name: 'English',  pattern: /en.*/i },
  { code: codeDe, name: 'Deutsch',  pattern: /de.*/i },
  { code: codeFr, name: 'Français', pattern: /fr.*/i },
];

export const translations = {
  [codeEn]: dictionaryEn,
};

export function newI18N(_code= codeEn, _dictionary = translations[_code]) {
  return {
    _code,
    _dictionary,
    _: (key) => _dictionary[key] ?? `no translation for ${key}`,
    translate: (key) => _dictionary[key] ?? `no translation for ${key}`,
  };
}
