const express = require("express");
const next = require("next");
const getConfig = require('./next.config');

const { createProxyMiddleware } = require('http-proxy-middleware')

const port = 3001;
const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === 'production';

const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
  prod,
});

const handle = app.getRequestHandler();

const devProxy = {
  '/uat': {
    target: getConfig.env.uat,
    pathRewrite: { '^/uat': '/' },
    changeOrigin: true,
  }
}

app.prepare().then(() => {
  const server = express();

  Object.keys(devProxy).forEach(function (context) {
    server.use(context, createProxyMiddleware(devProxy[context]))
  })

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("Environment ", process.env.NODE_ENV);
    console.log("Environment is Production ", prod);
    console.log(`> Ready on http://localhost:${port}`);
  });
});
