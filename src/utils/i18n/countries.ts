import { localeCodes } from './locales';

export interface CountryOptionType {
  key: string;
  value: string;
  flag: string;
  text: string;
  content: string;
}

export const countryOptions: CountryOptionType[] = localeCodes.map(({ code, name, flag }) => (
  { key: code, value: code, flag, text: name, content: name }
));
