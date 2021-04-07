const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html land="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Meu primeiro servidor em Node.js!</title>
      <style>
        h1{ color: blue; }
      </style>
    </head>
    <body>
    <h1>Meu primeiro servidor em Node.js!</h1>
    <p>Olá, mundo!</p>
    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
