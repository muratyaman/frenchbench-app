import { newApiOnServer, newConfigOnServer, serializeFbCookie } from '../../utils/serverSide';

export default async function signinHandler(req, res) {
  try {
    const config    = newConfigOnServer();
    const api       = newApiOnServer(config.api);
    console.debug('signin input', req.body);
    const result    = await api.signin(req.body);
    const output    = result.data; // read response body
    console.debug('signin output', output);
    const { data = null } = output;
    if (data && data.token) {
      const cookieStr = serializeFbCookie(data.token);
      res.setHeader('Set-Cookie', cookieStr);
    }
    return res.json(output);
  } catch (err) {
    return res.json({ error: err.message });
  }
}
