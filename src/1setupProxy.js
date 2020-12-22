const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.doctorxiong.club/v1',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      },
    })
  );
};