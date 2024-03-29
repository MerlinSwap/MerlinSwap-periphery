const { ethers } = require("hardhat");
const settings = require("../.settings.js");
const BigNumber = require('bignumber.js');
function blockNum2BigNumber(blockNum) {
  return BigNumber(blockNum._hex);
}
async function main() {
    [signer] = await ethers.getSigners();
    
    const Swap = await ethers.getContractFactory("Swap");
    const swap = Swap.attach(settings.swapAddr);

    const tokenContract = await ethers.getContractFactory("Token");

    const WETH = tokenContract.attach(settings.weth);
    await WETH.approve(settings.swapAddr, '1000000000000000000000000000000000');

    const merlin = tokenContract.attach(settings.merlin);
    await merlin.approve(settings.swapAddr, '1000000000000000000000000000000000');

    console.log(await merlin.allowance(signer.address, settings.swapAddr));
    var ethOrigin = blockNum2BigNumber(await ethers.provider.getBalance(signer.address));
    var merlinOrigin = blockNum2BigNumber(await merlin.balanceOf(signer.address));
    /*
    amount: "800000000000000000000000"
boundaryPt: 414500
fee: 3000
maxPayed: "880000000000000000000000"
minAcquired: "169522502906838357000"
recipient: "0x133281E77949461932b38334c1E8609422A42C4a"
tokenX: "0x3AD23A16A81Cd40010F39309876978F20DD2f682"
tokenY: "0xEe5e3852434eB67F8e9E97015e32845861ea15E8"
    */
    tx = await swap.swapX2Y(
      {
        tokenX: settings.weth, 
        tokenY: settings.merlin, 
        fee: 3000,
        amount: "188000000000000000000",
        boundaryPt: 82500,
        maxPayed: "189000000000000000000",
        minAcquired: "0",
        recipient: signer.address
      }
    );
    
    var ethCurr = blockNum2BigNumber(await ethers.provider.getBalance(signer.address));
    var merlinCurr = blockNum2BigNumber(await merlin.balanceOf(signer.address));
    console.log("swap tx: ", tx);

    console.log("delta bit: ", ethCurr.minus(ethOrigin).toFixed(0));
    console.log("delta usdc: ", merlinCurr.minus(merlinOrigin).toFixed(0));
}

main().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})