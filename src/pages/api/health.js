import { newConfig, newMongo, newPg } from '../../serverLib';

async function handler(req, res) {
  try {
    const config = newConfig(process.env);

    // const pg = await newPg(config);
    // const userCount = await pg.query('SELECT NOW() AS ts, COUNT(*) AS user_count FROM users');

    const { db }   = await newMongo({ config });
    const profilesColl = db.collection('profiles');
    const profileCount = await profilesColl.estimatedDocumentCount();

    res.status(200).json({ ts: new Date(), status: 'ok', profileCount });
  } catch (err) {
    res.status(500).json({ ts: new Date(), status: err.message });
  }
}

export default handler;
