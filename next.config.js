// const isProd = process.env.NODE_ENV === 'production'

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {

  const poweredByHeader = false;
  const generateEtags = false;
  const distDir = 'dist';

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      poweredByHeader,
      generateEtags,
      distDir,
    }
  }

  return {
    /* config options for all phases except development here */
    // TODO: use the CDN in production and localhost for development.
    // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    poweredByHeader,
    generateEtags,
    distDir,
    async rewrites() {
      return [
        // we need to define a no-op rewrite to trigger checking
        // all pages/static files before we attempt proxying
        {
          source: '/:path*',
          destination: '/:path*',
        },
        {
          source: '/api2/:path*',
          destination: `http://127.0.0.1:15000/api2/:path*`,
        },
      ]
    },
  }
}
