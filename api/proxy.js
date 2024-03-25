const { createProxyMiddleware, responseInterceptor } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const version = '2.0.2';
  console.log('version: ' + version);
  const host = req.headers.host; 
  const cookies = req.cookies;


  let target = 'www.junfa.wang';
  if (host === 'gs.junfa.wang') {
    target = 'https://www.google.com/';
  } else if (host === 'ytb.junfa.wang') {
    target = 'https://www.youtube.com/';
  } else if (host === 'hub.junfa.wang') {
    target = 'https://www.github.com';
  }

  console.log(host);
  console.log(target);
  // // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {},
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8'); // convert buffer to string
      return response
        .replace(/https:\/\/www\.youtube\.com/gi, 'https://ytb.junfa.wang')
        .replace(/https:\/\/www\.google\.com/gi, 'https://gs.junfa.wang')
        .replace(/https:\/\/www\.github\.com/gi, 'https://hub.junfa.wang')
        .replace(/<\/html>/gi, `<!-- proxy version: ${version} --> </html>`)
    }),
  })(req, res);
};
