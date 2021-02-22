export const localeCodeEn = 'en';
export const localeCodeTr = 'tr';

export interface LocaleType {
  code: string;
  name: string;
  pattern: RegExp;
  flag: string;
}

export const localeCodes: LocaleType[] = [
  { code: localeCodeEn, name: 'English', pattern: /^en.*/i, flag: 'gb' },
  { code: localeCodeTr, name: 'Türkçe',  pattern: /^tr.*/i, flag: 'tr' },
];
