const { createProxyMiddleware, responseInterceptor } = require("http-proxy-middleware");

module.exports = (req, res) => {
  // res.status(200).json({ name: 'Yongwang' })
  // console.log('===');
  // let target = "https://www.google.com";
  // // let target = 'https://www.baidu.com';
  // // 创建代理对象并转发请求
  // return createProxyMiddleware({
  //   target,
  //   changeOrigin: true,
  //   pathRewrite: {
  //     // 通过路径重写，去除请求路径中的 `/backend`
  //     // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
  //     //   "^/backend/": "/",
  //   },
  // })(req, res);
  const host = req.headers.host; 
  const cookies = req.cookies;
  // const { username, password } = cookies;
  // if (username !== 'admin' && password !== '9000') {
  //   res.redirect(301, '/next/login?type=logout'); 
  //   return;
  // }
  // console.log('===');

  let target = 'https://www.google.com/';
  // let target = 'https://www.baidu.com/';
  // let target = 'https://www.youtube.com/';
  // // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      //   "^/backend/": "/",
    },
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8'); // convert buffer to string
      return response
        .replace(/https:\/\/www\.youtube\.com/gi, 'https://ytb.junfa.wang')
    }),
  })(req, res);
};
