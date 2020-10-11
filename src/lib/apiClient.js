import axios from 'axios';
import { v4 as newUuid } from 'uuid';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig(); // only holds serverRuntimeConfig and publicRuntimeConfig
console.log('serverRuntimeConfig', serverRuntimeConfig); // will only be available on the server-side
console.log('publicRuntimeConfig', publicRuntimeConfig); // will be available on both server-side and client-side

export function apiClient() {
  const onServer = typeof window === 'undefined';
  console.log('apiClient', onServer ? 'node' : 'browser');
  const { host, apiBaseUrl } = onServer ? serverRuntimeConfig : publicRuntimeConfig;
  const baseURL = host + apiBaseUrl;
  const _api = axios.create({ baseURL, withCredentials: true });

  const _action = async (action, input = {}, id = null) => {
    const reqId = newUuid();
    console.log('api request', reqId, action);
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
  const me      = async ()      => _action('me');

  const searchUsers            = async (input)    => _action('user_search', input);
  const retrieveUser           = async (id)       => _action('user_retrieve', {}, id);
  const retrieveUserByUsername = async (username) => _action('user_retrieve_by_username', { username });

  const retrieveUserPosts = async (username)           => _action('post_search_by_username', { username });
  const retrieveUserPost  = async (username, post_ref) => _action('post_retrieve_by_username_and_post_ref', { username, post_ref });

  const searchPosts  = async (input)     => _action('post_search', input);
  const createPost   = async (input)     => _action('post_create', input);
  const retrievePost = async (id)        => _action('post_retrieve', {}, id);
  const updatePost   = async (id, input) => _action('post_update', input, id);
  const deletePost   = async (id)        => _action('post_delete', {}, id);

  return {
    _api,
    _action,

    echo,
    health,
    signup,
    signin,
    me,

    searchUsers,
    retrieveUser,
    retrieveUserByUsername,

    retrieveUserPosts,
    retrieveUserPost,
    
    searchPosts,
    createPost,
    retrievePost,
    updatePost,
    deletePost,
  };
}