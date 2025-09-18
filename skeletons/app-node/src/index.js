const http = require('http');
const port = process.env.PORT || 8080;
const msg  = `Hello from {{serviceName}}. DB host: ${process.env.DB_HOST || 'unset'}`;

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end(msg + '\n');
}).listen(port, () => console.log(`listening on ${port}`));
