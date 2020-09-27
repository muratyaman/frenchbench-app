import { serializeFbCookie } from '../../utils/serverSide';

export default async function signoutHandler(req, res) {
  try {
    const token = '';
    const cookieStr = serializeFbCookie(token);
    res.setHeader('Set-Cookie', cookieStr);
    return res.json({ data: true });
  } catch (err) {
    return res.json({ error: err.message });
  }
}
