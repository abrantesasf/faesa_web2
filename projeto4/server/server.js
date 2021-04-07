const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Rota --> ', req.url);

    if(req.url === '/') {
        fs.readFile("./views/index.html", (err, data) => {
            if(err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else if (req.url === '/contato') {
        fs.readFile("./views/contato.html", (err, data) => {
            if(err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else {
        fs.readFile("./views/404.html", (err, data) => {
            if(err) {
                throw err;
            }
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
});