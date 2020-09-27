import { newApiOnServer, newConfigOnServer, parseFbCookie } from '../../utils/serverSide';

export default async function meHandler(req, res) {
  try {
    const config    = newConfigOnServer();
    const authToken = parseFbCookie(req.headers.cookie ?? '');
    const api       = newApiOnServer(config.api, authToken);
    const result    = await api.me();
    const output    = result.data; // read response body
    return res.json(output);
  } catch (err) {
    return res.json({ error: err.message });
  }
}
