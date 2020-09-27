import axios from 'axios';
import useSWR from 'swr';

export const newConfigOnClient = () => {
  const penv = process && process.env ? process.env : {};
  return {
    api: {
      baseURL: penv.NEXT_PUBLIC_API_BASE_URL || '/api',
      timeout: 30 * 1000,
    },
  };
};

export const newApiOnClient = (config = {}) => {
  const _api = axios.create({
    ...config,
    withCredentials: true, // cookies
  });

  const signup  = async (data) => _api.post('/signup', data);
  const signin  = async (data) => _api.post('/signin', data);
  const signout = async (data) => _api.post('/signout', data);
  const me      = async ()     => _api.post('/me');
  const action  = async (data) => _api.post('/action', data);
  const posts   = async (params) => _api.get('/posts', { params });

  return {
    signup,
    signin,
    signout,
    me,
    action,
    posts,
  };

};


export function useUser(id = null) {
  const url = id ? `/api/user/${id}` : '/api/me';
  const { data, error } = useSWR(url);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
