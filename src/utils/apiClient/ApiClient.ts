import axios, { AxiosInstance } from 'axios';
import { v4 as newUuid } from 'uuid';
import * as t from './types';

export class ApiClient {
  
  _api: AxiosInstance;
  options: t.ApiClientOptions;
  onServer: boolean;

  constructor(options: t.ApiClientOptions = {}) {
    this.options = options;
    const { host = '', baseUrl = '', browser = null } = options;

    this.onServer = typeof window === 'undefined';
    console.log('apiClient is running on', this.onServer ? 'node' : 'browser');

    this._api = axios.create({
      baseURL: host + baseUrl,
      withCredentials: true,
    });
  }

  async _action<TData = any, TMeta = any>(
    action: string,
    input: any = {},
    id: string | null = null,
  ): Promise<t.ApiResponse<TData, TMeta>> {
    const reqId = newUuid();
    console.log('api request', reqId, action, input, id);
    try {
      const headers = { 'x-fb-request-id': reqId };
      const res = await this._api.post<t.ApiResponse<TData, TMeta>>('', { action, input, id }, { headers }); // to avoid 308 perm. redirect from '/api/' to '/api'
      console.log('api response', reqId, res.data);
      return res.data;
    } catch (err) {
      console.log('api response', reqId, { error: err.message });
      return { error: err.message };
    }
  }

  async _upload<TData = any, TMeta = any>(
    form: any,
    options = {},
  ): Promise<t.ApiResponse<TData, TMeta>> {
    const reqId = newUuid();
    console.log('api request upload', reqId, form);
    try {
      const headers = { 'x-fb-request-id': reqId };
      const res = await this._api.post<t.ApiResponse<TData, TMeta>>('/upload', form, { headers, ...options }); // to avoid 308 perm. redirect from '/api/' to '/api'
      console.log('api response upload', reqId, res.data);
      return res.data;
    } catch (err) {
      console.log('api response upload', reqId, { error: err.message });
      return { error: err.message };
    }
  }
  
  async echo<T = any>(input: T = null) {
    return this._action<T>('echo');
  }
  async health() {
    return this._action<string>('health');
  }

  // AUTH =====================================================================
  async signup(input: t.SignUpInput) { return this._action<t.SignUpData>('signup', input); }
  async signin(input: t.SignInInput) { return this._action<t.SignInData>('signin', input); }
  async signout() {
    // call api, clear cookie, go to home page
    try {
      const ignore  = await this._action<t.SignOutData>('signout'); // token 'x' ==> cookie invalid now
      if (this.options.browser) {
        const removed = await this.options.browser.cookies.remove({ name: 'fbsecret' });// TODO: use env setting
      }
    } catch (err) {
      console.error('signout error', err);
    }
  }

  // USERS ====================================================================
  async me() { return this._action<t.UserRetrieveData>('me'); }

  async user_search(input: t.UserSearchInput = {}) {
    return this._action<t.UserSearchData>('user_search', input);
  }
  async user_retrieve(id: string) {
    return this._action<t.UserRetrieveData>('user_retrieve', {}, id);
  }
  async user_retrieve_by_username(username: string) {
    return this._action<t.UserRetrieveData>('user_retrieve_by_username', { username });
  }
  async usercontact_update_self(input) {
    return this._action('usercontact_update_self', input);
  }
  async usergeo_update_self(input) {
    return this._action('usergeo_update_self', input);
  }

  // POSTS ====================================================================
  async post_retrieve_by_username_and_post_ref(input) {
    return this._action<t.PostRetrieveData, t.PostSearchMeta>('post_retrieve_by_username_and_post_ref', input);
  }
  // pass { user_id } or { username }
  async post_search_by_user(input) {
    return this._action<t.PostSearchData, t.PostSearchMeta>('post_search_by_user', input);
  }
  async post_search(input: t.PostSearchInput = {}) {
    return this._action<t.PostSearchData, t.PostSearchMeta>('post_search', input);
  }
  async post_create(input: t.PostCreateInput) {
    return this._action<t.PostCreateData>('post_create', input);
  }
  async post_retrieve(id: string) {
    return this._action<t.PostRetrieveData>('post_retrieve', {}, id);
  }
  async post_update(id: string, input: t.PostUpdateInput) {
    return this._action<t.PostUpdateData>('post_update', input, id);
  }
  async post_delete(id: string) {
    return this._action<t.PostDeleteData>('post_delete', {}, id);
  }

  // ADVERTS ==================================================================
  async advert_retrieve_by_username_and_advert_ref(input) {
    return this._action('advert_retrieve_by_username_and_advert_ref', input);
  }
  // pass { user_id } or { username }
  async advert_search_by_user(input) {
    return this._action<t.AdvertSearchData, t.AdvertSearchMeta>('advert_search_by_user', input);
  }
  async advert_search(input: t.AdvertSearchInput = {}) {
    return this._action<t.AdvertSearchData, t.AdvertSearchMeta>('advert_search', input);
  }
  async advert_create(input: t.AdvertCreateInput) {
    return this._action<t.AdvertCreateData>('advert_create', input);
  }
  async advert_retrieve(id) {
    return this._action<t.AdvertRetrieveData>('advert_retrieve', {}, id);
  }
  async advert_update(id, input) {
    return this._action<t.AdvertUpdateData>('advert_update', input, id);
  }
  async advert_delete(id) {
    return this._action<t.AdvertDeleteData>('advert_delete', {}, id);
  }

  // ARTICLES =================================================================
  async article_search(input = {}) {
    return this._action('article_search', input);
  }
  async article_retrieve({ slug }, id = null) {
    return this._action('article_retrieve', { slug }, id);
  }
  async article_update(id, input) {
    return this._action('article_update', input, id);
  }

  // ASSETS ===================================================================
  async asset_create(input) { return this._action('asset_create', input); }
  async asset_delete(id)    { return this._action('asset_delete', {}, id); }

  async entity_asset_create (input){ return this._action('entity_asset_create', input); }
  async entity_asset_delete (id)   { return this._action('entity_asset_delete', {}, id); }

  // OPTIONS ==================================================================
  async buyingOptionList(): Promise<t.OptionList> {
    return ([
      { label: 'buying_options__0__label',  id: '0' },
      { label: 'buying_options__1__label', id: '1' },
    ]);
  }
  
  async serviceOptionList(): Promise<t.OptionList> {
    return ([
      { label: 'service_options__0__label', id: '0' },
      { label: 'service_options__1__label', id: '1' },
    ]);
  }
  
  async currencyOptionList(): Promise<t.OptionListCurrency> {
    return  ([
      { label: 'currency_options__gbp__label', symbol: '£', id: 'GBP' },
      { label: 'currency_options__eur__label', symbol: '€', id: 'EUR' },
      { label: 'currency_options__usd__label', symbol: '$', id: 'USD' },
      { label: 'currency_options__try__label', symbol: '₺', id: 'TRY' },
    ]);
  }
}
