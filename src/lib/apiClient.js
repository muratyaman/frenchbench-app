import axios from 'axios';
import { v4 as newUuid } from 'uuid';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig(); // only holds serverRuntimeConfig and publicRuntimeConfig

export function apiClient() {
  
  //console.log(serverRuntimeConfig); // will only be available on the server-side
  //console.log(publicRuntimeConfig); // will be available on both server-side and client-side
  
  const onServer = typeof window === 'undefined';
  console.log('apiClient is running on', onServer ? 'node' : 'browser');
  const { host, apiBaseUrl } = onServer ? serverRuntimeConfig : publicRuntimeConfig;
  const baseURL = host + apiBaseUrl;
  const _api = axios.create({ baseURL, withCredentials: true });

  const _action = async (action, input = {}, id = null) => {
    const reqId = newUuid();
    console.log('api request', reqId, action, input, id);
    let output = { data: null, error: null };
    try {
      const headers = { 'x-fb-request-id': reqId };
      const res = await _api.post('', { action, input, id }, { headers }); // to avoid 308 perm. redirect from '/api/' to '/api'
      output = res.data; // return body; expecting { data, error }
    } catch (err) {
      output.error = err.message;
    }
    console.log('api response', reqId, output);
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
      const removed = await browser.cookies.remove({ name: 'fbsecret' });// TODO: use env setting
    } catch (err) {
      console.error('signout error', err);
    }
  }
  const me      = async ()      => _action('me');

  const user_search               = async (input)    => _action('user_search', input);
  const user_retrieve             = async (id)       => _action('user_retrieve', {}, id);
  const user_retrieve_by_username = async (username) => _action('user_retrieve_by_username', { username });
  const usercontact_update_self   = async (input)    => _action('usercontact_update_self', input);
  const usergeo_update_self       = async (input)    => _action('usergeo_update_self', input);

  // pass { user_id } or { username }
  const post_search_by_user                     = async (input)              => _action('post_search_by_user', input);
  const post_retrieve_by_username_and_post_ref  = async (username, post_ref) => _action('post_retrieve_by_username_and_post_ref', { username, post_ref });

  const post_search   = async (input = {}) => _action('post_search', input);
  const post_create   = async (input)      => _action('post_create', input);
  const post_retrieve = async (id)         => _action('post_retrieve', {}, id);
  const post_update   = async (id, input)  => _action('post_update', input, id);
  const post_delete   = async (id)         => _action('post_delete', {}, id);

  const article_search   = async (input = {}) => _action('article_search', input);
  const article_retrieve = async (slug)       => _action('article_retrieve', { slug }, null);

  return {
    _api,
    _action,

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

    article_search,
    article_retrieve,
  };
}