export function newConfig(penv) {
  return {
    pg: {
      poolOptions: {
        // 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
        // connectionString: penv.DATABASE_URL,
        host:     penv.PGHOST || '127.0.0.1',
        user:     penv.PGUSER || 'frenchbench',
        database: penv.PGDATABASE || 'frenchbench',
        password: penv.PGPASSWORD || '',
        port:     penv.PGPORT || 5432,

        // number of milliseconds to wait before timing out when connecting a new client
        // by default this is 0 which means no timeout
        connectionTimeoutMillis: 10 * 1000,

        // number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded default is 10000 (10 seconds)
        // set to 0 to disable auto-disconnection of idle clients
        idleTimeoutMillis: 5 * 60 * 1000,

        // maximum number of clients the pool should contain; by default this is set to 10
        max: 10,
      },
    },
    mongo: {
      uri:    penv.MONGODB_URI || 'mongodb://127.0.0.1:27017/fbdb',
      dbName: penv.MONGODB_DB || 'fbdb',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  };
}
