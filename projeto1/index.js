var { seno } = require('./modulos/modulo');
var { cosseno } = require('./modulos/modulo');

console.log(seno(180));
console.log(cosseno(180));

var aluno = require('./modulos/aluno');
let otavio = new aluno("Prof. Otávio");
console.log(otavio);
