const express = require('express');
const app = express();
const hostname = "0.0.0.0";
const port = 3005;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

const alunosRoutes = require('./routes/alunos-routes');
app.use('/api/alunos/', alunosRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
})

app.get('/contato', (req, res) => {
    res.send('Aqui é o contato.');
})

app.get('/json', (req, res) => {
    res.json({
        status: "ok",
        message: "Servidor entretando JSON perfeitamente."
    })
})

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em: http://${hostname}:${port}`);
});
