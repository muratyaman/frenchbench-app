import { MongoClient } from 'mongodb';



let cachedClient = null;
let cachedDb     = null;


export async function newMongo({ config }) {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db:     cachedDb,
    };
  }

  const { uri, dbName, options } = config.mongo;
  const client = await MongoClient.connect(uri, options);
  const db     = client.db(dbName);

  cachedClient = client;
  cachedDb     = db;

  return { client, db };
}
