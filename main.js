const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data ,previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculaHash();
        this.nonce = 0
    }

    calculaHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 5;
    }
    createGenesisBlock(){
        return new Block(0, "18/02/2024", "Genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addblock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculaHash();
        newBlock.mineblock(this.difficulty);
        this.chain.push(newBlock);
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
console.log('Minerando block 1...')
savjeeCoin.addblock(new Block(1, "21/02/2024",{amount: 4}));
console.log('Minerando block 2...')
savjeeCoin.addblock(new Block(2, "26/02/2024",{amount: 10}));



// console.log(JSON.stringify(savjeeCoin, null ,4));
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());
// savjeeCoin.chain[1].data = {amout: 100};
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculaHash();
// console.log('se o bloco é valido ? ' + savjeeCoin.isChainValid());