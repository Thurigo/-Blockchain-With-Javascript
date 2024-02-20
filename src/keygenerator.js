const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publickKey =key.getPublic('hex');
const privateKey = key.getPrivate('hex');



console.log();
console.log('Chave Privada:',privateKey);

console.log();
console.log('Chave Publica', publickKey);