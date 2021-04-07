const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3001;

//app.get('/', (req, res) => {
//    res.send('Olá, mundo!');
//})

//app.post('/', (req, res) => {
//    res.send('Enviei um post ....');
//})

app.get('/', (req, res) => {
    res.send('GET -> READ');
})

app.post('/', (req, res) => {
    res.send('POST -> CREATE');
})

app.put('/', (req, res) => {
    res.send('PUT -> UPDATE');
})

app.patch('/', (req, res) => {
    res.send('PATCH -> UPDATE');
})

app.delete('/', (req, res) => {
    res.send('DELETE -> DELETE');
})

app.listen(port);