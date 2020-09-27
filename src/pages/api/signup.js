import { newApiOnServer, newConfigOnServer } from '../../utils/serverSide';

export default async function signupHandler(req, res) {
  try {
    const config = newConfigOnServer();
    const api    = newApiOnServer(config.api);
    const result = await api.signup(req.body);
    const output = result.data; // read response body
    return res.json(output);
  } catch (err) {
    return res.json({ error: err.message });
  }
}
