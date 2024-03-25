const { createProxyMiddleware, responseInterceptor } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const version = '2.0.1';
  console.log('version: ' + version);
  const host = req.headers.host; 
  const cookies = req.cookies;
  console.log('host', host);
  // const { username, password } = cookies;
  // if (username !== 'admin' && password !== '9000') {
  //   res.redirect(301, '/next/login?type=logout'); 
  //   return;
  // }
  // console.log('===');

  // let target = 'https://www.google.com/';
  let target = 'www.junfa.wang';
  if (host === 'gs.junfa.wang') {
    target = 'https://www.google.com/';
  } else if (host === 'ytb.junfa.wang') {
    target = 'https://www.youtube.com/';
  } else if (host === 'hub.junfa.wang') {
    target = 'https://www.github.com';
  }
  // // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {},
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8') + `<!-- proxy version ${version} -->`; // convert buffer to string
      return response
        .replace(/https:\/\/www\.youtube\.com/gi, 'https://ytb.junfa.wang')
        .replace(/https:\/\/www\.google\.com/gi, 'https://gs.junfa.wang')
        .replace(/https:\/\/www\.github\.com/gi, 'https://hub.junfa.wang')
    }),
  })(req, res);
};
