const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// 프록시 서버 설정
const proxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:5000', // Flask 서버로 프록시 요청을 전달
  changeOrigin: true,
});

// HTTPS 서버 생성
https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'), // SSL 개인 키 파일
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'), // SSL 인증서 파일
    },
    function (req, res) {
      // HTTPS 요청이 들어오면 프록시를 통해 Flask 서버로 전달
      proxy.web(req, res, function (err) {
        if (err) {
          console.error('Proxy error:', err);
          res.writeHead(502, { 'Content-Type': 'text/plain' });
          res.end('Bad Gateway');
        }
      });
    }
  )
  .listen(5000, () => {
    console.log('HTTPS server running on https://127.0.0.1:5000');
  });
