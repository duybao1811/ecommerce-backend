export default () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  auth: {
    JWT_REFRESH_SECRET: 'your_jwt_refresh_secret_key',
    JWT_ACCESS_SECRET: 'your_jwt_access_secret_key',
  },
});
