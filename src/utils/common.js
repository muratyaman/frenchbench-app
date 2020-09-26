import axios from 'axios';

export const newApi = (config = {}, authToken = null) => {
  const headers = authToken ? { authorization: `Bearer ${authToken}` } : {};
  const _api = axios.create({
    ...config,
    ...headers,
  });

  const register = async (
    data = { username: '', password: '', password_confirm: '' },
  ) => {
    return _api.post('/v1/auth/register', data);
  };

  const login = async (
    data = { username: '', password: '' },
  ) => {
    return _api.post('/v1/auth/login', data);
  };

  return {
    _api,
    register,
    login,
  };

};
