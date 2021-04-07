const { soma, subtracao } = require('./app_modules/aux.js');
const { multiplicacao, divisao} = require('./app_modules/aux2');

var x = 10;
var y = 20;

console.log(soma(x, y));
console.log(subtracao(x, y));
console.log(multiplicacao(x, y));
console.log(divisao(x, y));