// DEV MODE ONLY
// @see https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const proxyOptions = {
    target: 'http://127.0.0.1:12000',
    changeOrigin: true,
    //ws: true, // proxy websockets
  };
  app.use('/api', createProxyMiddleware(proxyOptions));
};