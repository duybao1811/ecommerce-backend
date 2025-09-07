export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'exclusive',
    sync: process.env.DB_SYNC === 'true',
  },
});
