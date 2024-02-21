

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const{Blockchain, Transaction} = require('./blockchain');

const myKey = ec.keyFromPrivate('4df3d28a2235e9b2c8bf185cabf270a2d7afc28eb7692a7dbf3053d42cfbb00c');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here',10);
tx1.signTransaction(myKey)
savjeeCoin.addTransaction(tx1)




console.log('\n Start na minerar... ');

savjeeCoin.minePendingTrasactions(myWalletAddress);
console.log('\nBalanciamento do Spider e', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('valida transferencia',savjeeCoin.isChainValid());

// console.log(JSON.stringify(savjeeCoin, null ,4));
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());
// savjeeCoin.chain[1].data = {amout: 100};
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculaHash();
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());



// console.log('Minerando block 1...')
// savjeeCoin.addblock(new Block(1, "21/02/2024",{amount: 4}));
// console.log('Minerando block 2...')
// savjeeCoin.addblock(new Block(2, "26/02/2024",{amount: 10}));


// savjeeCoin.createTranscation(new Transaction('address1','address2',100));
// savjeeCoin.createTranscation(new Transaction('address2','address1',50));




// console.log('\n Start na minerar... ');
// savjeeCoin.minePendingTrasactions('spider');

// console.log('\nBalanciamento do Spider e', savjeeCoin.getBalanceOfAddress('spider'));