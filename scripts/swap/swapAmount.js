
const Web3 = require("web3");

const abi = require('./swapAbi.json')


const rpc = 'https://rpc.goerli.linea.build/'
var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

//Example: HARDHAT_NETWORK='izumiTest' node increaseCardinality.js iZi WETH9 3000 20
function num2Hex(n) {
  if (n < 10) {
      return String(n);
  }
  const str = 'ABCDEF';
  return str[n - 10];
}

function fee2Hex(fee) {
  const n0 = fee % 16;
  const n1 = Math.floor(fee / 16) % 16;
  const n2 = Math.floor(fee / 256) % 16;
  const n3 = Math.floor(fee / 4096) % 16;
  const n4 = 0;
  const n5 = 0;
  return '0x' + num2Hex(n5) + num2Hex(n4) + num2Hex(n3) + num2Hex(n2) + num2Hex(n1) + num2Hex(n0);
}
function appendHex(hexString, newHexString) {
  return hexString + newHexString.slice(2);
}
async function main() {
  const usdt = '0x6AECfe44225A50895e9EC7ca46377B9397D1Bb5b'
  const usdc = '0x6a7436775c0d0B70cfF4c5365404ec37c9d9aF4b'
  const swapAddress = '0xa88C8AA45D9f7a33F4BC53d4d449F669BF60F823'
  let hex = appendHex(usdc, fee2Hex(2000))
  hex = appendHex(hex, usdt) 
  const swap = new web3.eth.Contract(abi, swapAddress);
  const recipient = '0xe90ebA9b7f3fC6a0B1aE28FfF4932cb9E35B6946';
  const swapParams = {
      path: hex,
      recipient: recipient,
      amount: '1000000000000000000',
      minAcquired: '0',
      deadline: '0xffffffff',
  }
  try {
    const ret = await swap.methods.swapAmount(swapParams).call(
        {
            from: '0xe90ebA9b7f3fC6a0B1aE28FfF4932cb9E35B6946',
        }
    );
  } catch (err) {
      // error occured
      console.log(err)
  }

//   // call from your own address
//   // fill following 'pk' and 'msgSender'
//   const pk = '{your private key}';
//   const msgSender = '{address compute from pk}'

//   // notice: you should call
//   // " ERC20Token(usdc).approve(swapAddress, '100000000000000000000') "
//   // and ensure your address has enough usdc
//   // before you use your private key to send following transaction

//   const txData = swap.methods.swapAmount(swapParams).encodeABI()
//   // estimate gas
//   const gasLimit = await swap.methods.swapAmount(swapParams).estimateGas({from: msgSender});
  
//   console.log('gasLimit: ', gasLimit)
  
//   const signedTx = await web3.eth.accounts.signTransaction(
//       {
//           // nonce: 0,
//           to: swapAddress,
//           data:txData,
//           gas: Math.ceil(gasLimit * 1.1),
//         //   gasPrice: 35000000000,
//       }, 
//       pk
//   );
//   
//   const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   console.log('tx: ', tx);
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
