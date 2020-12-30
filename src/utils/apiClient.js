import axios from 'axios';
import { v4 as newUuid } from 'uuid';

export function apiClient({ host, baseUrl, browser = null }) {

  const onServer = typeof window === 'undefined';
  console.log('apiClient is running on', onServer ? 'node' : 'browser');

  const _api = axios.create({
    baseURL: host + baseUrl,
    withCredentials: true,
  });

  const _action = async (action, input = {}, id = null) => {
    const reqId = newUuid();
    console.log('api request', reqId, action, input, id);
    let output = { data: null, meta: null, error: null };
    try {
      const headers = { 'x-fb-request-id': reqId };
      const res = await _api.post('', { action, input, id }, { headers }); // to avoid 308 perm. redirect from '/api/' to '/api'
      output = res.data; // return body; expecting { data, meta, error }
    } catch (err) {
      output.error = err.message;
    }
    console.log('api response', reqId, output);
    return output;
  }

  const _upload = async (form, options = {}) => {
    const reqId = newUuid();
    console.log('api request upload', reqId, form);
    let output = { data: null, meta: null, error: null };
    try {
      const headers = { 'x-fb-request-id': reqId };
      const res = await _api.post('/upload', form, { headers, ...options }); // to avoid 308 perm. redirect from '/api/' to '/api'
      output = res.data; // return body; expecting { data, meta, error }
    } catch (err) {
      output.error = err.message;
    }
    console.log('api response upload', reqId, output);
    return output;
  }
  
  const echo    = async ()      => _action('echo');
  const health  = async ()      => _action('health');
  const signup  = async (input) => _action('signup', input);
  const signin  = async (input) => _action('signin', input);
  const signout = async ()      => {
    // call api, clear cookie, go to home page
    try {
      const ignore  = await _action('signout'); // token 'x' ==> cookie invalid now
      if (browser && browser.cookies) {
        const removed = await browser.cookies.remove({ name: 'fbsecret' });// TODO: use env setting
      }
    } catch (err) {
      console.error('signout error', err);
    }
  }
  const me = async () => _action('me');

  const user_search               = async (input)    => _action('user_search', input);
  const user_retrieve             = async (id)       => _action('user_retrieve', {}, id);
  const user_retrieve_by_username = async (username) => _action('user_retrieve_by_username', { username });
  const usercontact_update_self   = async (input)    => _action('usercontact_update_self', input);
  const usergeo_update_self       = async (input)    => _action('usergeo_update_self', input);

  // pass { user_id } or { username }
  const post_search_by_user                     = async (input) => _action('post_search_by_user', input);
  const post_retrieve_by_username_and_post_ref  = async (input) => _action('post_retrieve_by_username_and_post_ref', input);

  const post_search   = async (input = {}) => _action('post_search', input);
  const post_create   = async (input)      => _action('post_create', input);
  const post_retrieve = async (id)         => _action('post_retrieve', {}, id);
  const post_update   = async (id, input)  => _action('post_update', input, id);
  const post_delete   = async (id)         => _action('post_delete', {}, id);

  // pass { user_id } or { username }
  const advert_search_by_user                     = async (input) => _action('advert_search_by_user', input);
  const advert_retrieve_by_username_and_advert_ref  = async (input) => _action('advert_retrieve_by_username_and_advert_ref', input);

  const advert_search   = async (input = {}) => _action('advert_search', input);
  const advert_create   = async (input)      => _action('advert_create', input);
  const advert_retrieve = async (id)         => _action('advert_retrieve', {}, id);
  const advert_update   = async (id, input)  => _action('advert_update', input, id);
  const advert_delete   = async (id)         => _action('advert_delete', {}, id);

  const article_search   = async (input = {}) => _action('article_search', input);
  const article_retrieve = async ({ slug }, id = null)   => _action('article_retrieve', { slug }, id);
  const article_update   = async (id, input)  => _action('article_update', input, id);

  const asset_create   = async (input) => _action('asset_create', input);
  const asset_delete   = async (id)    => _action('asset_delete', {}, id);

  const entity_asset_create   = async (input) => _action('entity_asset_create', input);
  const entity_asset_delete   = async (id)    => _action('entity_asset_delete', {}, id);

  const buyingOptionList = () => ([
    { label: 'Take', id: '0' },
    { label: 'Give', id: '1' },
  ]);
  
  const serviceOptionList = () => ([
    { label: 'Product', id: '0' },
    { label: 'Service', id: '1' },
  ]);
  
  const currencyOptionList = () => ([
    { label: 'Pound Sterling', symbol: '£', id: 'GBP' },
    { label: 'Euro',           symbol: '€', id: 'EUR' },
    { label: 'US Dollar',      symbol: '$', id: 'USD' },
  ]);

  return {
    _api,
    _action,
    _upload,

    echo,
    health,
    signup,
    signin,
    signout,
    me,

    user_search,
    user_retrieve,
    user_retrieve_by_username,
    usercontact_update_self,
    usergeo_update_self,

    post_search_by_user,
    post_retrieve_by_username_and_post_ref,
    
    post_search,
    post_create,
    post_retrieve,
    post_update,
    post_delete,

    advert_search_by_user,
    advert_retrieve_by_username_and_advert_ref,
    
    advert_search,
    advert_create,
    advert_retrieve,
    advert_update,
    advert_delete,

    article_search,
    article_retrieve,
    article_update,

    asset_create,
    asset_delete,

    entity_asset_create,
    entity_asset_delete,

    options: {
      buyingOptionList,
      serviceOptionList,
      currencyOptionList,
    }
  };
}
