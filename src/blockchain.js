const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
    constructor(fromAddres, toAddres, amount){
        this.fromAddres = fromAddres
        this.toAddres = toAddres
        this.amount = amount
    }

    calculaHash(){
        return SHA256(this.fromAddres + this.toAddres + this.amount).toString();
    }
    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddres){
            throw new Error('nao pode transferir para outras carteiras');
        }
        const hashTx = this.calculaHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }
    isValid(){
        if(this.fromAddres===null)return true;

        if(!this.signature||this.signature.length === 0){
            throw new Error('no signature in this transaction')
        }

        const publickKey = ec.keyFromPublic(this.fromAddres, 'hex');
        return publickKey.verify(this.calculaHash(), this.signature);
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

hasValidTransactions(){
    for(const tx of this.transactions){
        if(!tx.isValid()){
            return false
        }
    }
    return true
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
        return new Block( "18/02/2024", [],"0");
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
        const rewardTx = new Transaction(null, miningRewardAddress,this.miningReward);
        this.pendingTransactions.push(rewardTx);
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);;
        block.mineblock(this.difficulty);

        console.log('Bloco Minerado!');
        this.chain.push(block);


        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addTransaction(transaction){

        if(!transaction.fromAddres || !transaction.toAddres){
            throw new Error('nao tem endereco')
        }

        if(!transaction.isValid()){
            throw new Error('transicao invalida')
        }

        this.pendingTransactions.push(transaction);
    }


    getBalanceOfAddress(address) {
        let balance = 0;
    
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.toAddres === address) {
                    balance += trans.amount; // Corrigido para '+='
                }
    
                if (trans.fromAddres === address) {
                    balance -= trans.amount;
                }
            }
        }
    
        return balance;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
    
            if (!currentBlock.hasValidTransactions()) {
                console.log('Transação inválida no bloco ' + i);
                return false;
            }
    
            if (currentBlock.hash !== currentBlock.calculaHash()) {
                console.log('Hash inválida no bloco ' + i);
                return false;
            }
    
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log('Hash anterior inválida no bloco ' + i);
                return false;
            }
        }
    
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;