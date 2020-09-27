import { newApiOnServer, newConfigOnServer, parseFbCookie } from '../../utils/serverSide';

export default async function actionHandler(req, res) {
  try {
    const config    = newConfigOnServer();
    const authToken = parseFbCookie(req.headers.cookie ?? '');
    const api       = newApiOnServer(config.api, authToken);

    const { action, input = {} } = req.body;
    if (!(action in api)) throw Error('invalid api action');

    const result = await api[action](input);
    const output = result.data; // read response body
    return res.json(output);
  } catch (err) {
    return res.json({ error: err.message });
  }
}
