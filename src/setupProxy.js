const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://adamix.net/medioambiente',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/api': '' },
      logLevel: 'debug',
    })
  );
};
