const SHA256 = require('crypto-js/sha256');


class Transaction{
    constructor(fromAddres, toAddres, amount){
        this.fromAddres = fromAddres
        this.toAddres = toAddres
        this.amount = amount
    }
}



class Block {
    constructor( timestamp, transactions ,previousHash = ''){
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculaHash();
        this.nonce = 0
    }

    calculaHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

mineblock(difficulty){
    while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculaHash();
    }
    console.log("bloco minerado: " + this.hash)
}

}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block( "18/02/2024", "Genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // addblock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     //newBlock.hash = newBlock.calculaHash();
    //     newBlock.mineblock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTrasactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineblock(this.difficulty);

        console.log('Bloco Minerado!');
        this.chain.push(block);


        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTranscation(transaction){
        this.pendingTransactions.push(transaction);
    }


    getBalanceOfAddress(address){
        let balance = 0;
        
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddres === address){
                    balance -=trans.amount;
                }

                if(trans.toAddres === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculaHash()){
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false; 
            }

            return true;
        }
    }
}

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