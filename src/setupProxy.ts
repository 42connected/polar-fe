import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_BACKEND_URL,
      changeOrigin: true,
    }),
  );
};
