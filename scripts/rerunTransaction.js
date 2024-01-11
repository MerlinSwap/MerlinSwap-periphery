const hardhat = require("hardhat");
const web3 = require("web3")
const config = require("../hardhat.config.js")

const v = process.argv


const para = {
    // network: process.env.HARDHAT_NETWORK,
    // rpc: config.networks[process.env.HARDHAT_NETWORK].url,
    tx: v[2],
}


async function main() {
    console.log("Paramters: ");
    for ( var i in para) { console.log("    " + i + ": " + para[i]); }

    const w3 = new web3('http://47.241.103.6:9545');
    const tx = await w3.eth.getTransaction(para.tx);
    w3.eth.call(tx, tx.blockNumber);
}


main().then(()=>{}).catch((err)=>{console.log(err)})