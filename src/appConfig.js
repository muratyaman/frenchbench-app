export const appConfig = {
  title: 'FrenchBench',
  version: 'v1.0.0-beta',
  api: {
    host: process.env.REACT_APP_HOST, // app itself
    baseUrl: process.env.REACT_APP_API_BASE_URL || '/api',
  },
  cdnUrl: process.env.REACT_APP_CDN || '/',
};
