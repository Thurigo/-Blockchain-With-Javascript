const SHA256 = require('crypto-js/sha256');

const{Blockchain, Transaction} = require('./blockchain');

let savjeeCoin = new Blockchain();

// console.log(JSON.stringify(savjeeCoin, null ,4));
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());
// savjeeCoin.chain[1].data = {amout: 100};
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculaHash();
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());



// console.log('Minerando block 1...')
// savjeeCoin.addblock(new Block(1, "21/02/2024",{amount: 4}));
// console.log('Minerando block 2...')
// savjeeCoin.addblock(new Block(2, "26/02/2024",{amount: 10}));


savjeeCoin.createTranscation(new Transaction('address1','address2',100));
savjeeCoin.createTranscation(new Transaction('address2','address1',50));


console.log('\n Start na minerar... ');
savjeeCoin.minePendingTrasactions('spider');

console.log('\nBalanciamento do Spider e', savjeeCoin.getBalanceOfAddress('spider'));


console.log('\n Start na minerar... ');
savjeeCoin.minePendingTrasactions('spider');

console.log('\nBalanciamento do Spider e', savjeeCoin.getBalanceOfAddress('spider'));