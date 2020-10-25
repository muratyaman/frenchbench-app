//const withPWA = require('next-pwa');
//const runtimeCaching = require('next-pwa/cache');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {

  const poweredByHeader = false;
  const generateEtags = false;
  const compress = false;
  const distDir = 'dist';

  const serverRuntimeConfig = { // will only be available on the server side
    host:       process.env.NEXT_PUBLIC_HOST || 'NO-HOST',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  };

  const publicRuntimeConfig = { // will be available on both server and client
    // staticFolder: '/static',
    host:       process.env.NEXT_PUBLIC_HOST || '',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return { // withPWA({
      // development only config options here
      poweredByHeader,
      generateEtags,
      compress,
      distDir,
      serverRuntimeConfig,
      publicRuntimeConfig,
      //pwa: {
      //  dest: 'public/pwa',
      //  runtimeCaching,
      //},
    };
  }

  return { // withPWA({
    // config options for all phases except development here
    // TODO: use the CDN in production and localhost for development.
    // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    poweredByHeader,
    generateEtags,
    compress,
    distDir,
    serverRuntimeConfig,
    publicRuntimeConfig,
    //pwa: {
    //  dest: 'public/pwa',
    //  runtimeCaching,
    //},
  };
};
