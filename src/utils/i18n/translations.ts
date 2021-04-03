import { localeCodeEn, localeCodeTr } from './locales';
import en from './trans/en.json';
import tr from './trans/tr.json';

export const I18N_TranslationObj = {
  home_welcome: '',

  ideas_loneliness: '',
  ideas_loneliness_quote: '',
  ideas_neighbourless: '',
  ideas_neighbourless_quote: '',
  ideas_true_neighbour: '',
  ideas_true_neighbour_quote: '',
  ideas_strangers: '',
  ideas_strangers_quote: '',

  common_error: '',
  common_and: '',
  common_can: '',
  common_need: '',
  common_i_need_help: '',
  common_i_can_help: '',
  common_terms: '',
  common_privacy: '',
  common_redirecting: '',
  common_loading: '',
  common_please_read: '',
  common_please_sign_in: '',
  
  common_posts: '',
  common_adverts: '',
  common_neighbours: '',
  common_my_posts: '',
  common_my_adverts: '',
  common_my_articles: '',
  common_sign_out: '',
  common_send: '',

  common_relevant: '',
  common_local: '',
  common_keep_helping_with_your: '',
  common_time: '',
  common_knowledge: '',
  common_products: '',
  common_services: '',
  common_find_receive_help_in_your: '',
  common_in_neighbourhood: '',
  common_neighbourhood: '',
  common_happy: '',
  common_exchanging: '',

  common_love_your_neighbours: '',
  
  account_sign_in: '',
  account_signin_prompt: '',
  account_if_account: '',
  account_you_have_an_account: '',
  account_have_one_in_a_minute: '',

  account_sign_up: '',
  account_signup_prompt: '',
  account_sign_up_i_agree: '',
  account_if_no_account: '',
  
  account_great_you_here: '',

  account_username: '',
  account_password: '',
  account_confirm_password: '',
  account_password_rules: '',

  article_not_found: '',

  neighbours_chat_room: '',

  // dynamic list below
  buying_options__0__label: '',
  buying_options__1__label: '',
  buying_options__2__label: '',
  buying_options__3__label: '',

  service_options__0__label: '',
  service_options__1__label: '',

  currency_options__eur__label: '',
  currency_options__gbp__label: '',
  currency_options__usd__label: '',
  currency_options__try__label: '',

  link_about_us: '',
  link_contact_us: '',
  link_terms_of_service: '',
  link_privacy_policy: '',
  link_safety: '',

  geo_status_prompt: '',
  geo_status_granted: '',
  geo_status_denied: '',
  geo_status_error: '',

  ws_status_unknown: '',
  ws_status_connecting: '',
  ws_status_open: '',
  ws_status_closing: '',
  ws_status_closed: '',
  ws_status_error: '',
};

export const I18N_Keys = Object.getOwnPropertyNames(I18N_TranslationObj);

export type I18N_TranslationSet = typeof I18N_TranslationObj;

export interface I18N_TranslationSets {
  [code: string]: I18N_TranslationSet;
}

// TODO: do not load all translations; async load only one
export const translations: I18N_TranslationSets = {
  [localeCodeEn]: en,
  [localeCodeTr]: tr,
};
