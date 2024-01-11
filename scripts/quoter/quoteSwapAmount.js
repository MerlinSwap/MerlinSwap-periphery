
const Web3 = require("web3");

const quoterJsonABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenX",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenY",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      },
      {
        "internalType": "int24",
        "name": "lowPt",
        "type": "int24"
      }
    ],
    "name": "swapX2Y",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountY",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "finalPoint",
        "type": "int24"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      },
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      }
    ],
    "name": "swapAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "acquire",
        "type": "uint256"
      },
      {
        "internalType": "int24[]",
        "name": "pointAfterList",
        "type": "int24[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenX",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenY",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      },
      {
        "internalType": "int24",
        "name": "highPt",
        "type": "int24"
      }
    ],
    "name": "swapY2X",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountX",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "finalPoint",
        "type": "int24"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
]



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
  const wide = '0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF'
  const izi = '0x876508837C162aCedcc5dd7721015E83cbb4e339'
  const usdt = '0x6AECfe44225A50895e9EC7ca46377B9397D1Bb5b'
  const usdc = '0x6a7436775c0d0B70cfF4c5365404ec37c9d9aF4b'
  const quoterAddress = '0xF6FFe4f3FdC8BBb7F70FFD48e61f17D1e343dDfD'
  let hex = appendHex(wide, fee2Hex(2000))
  hex = appendHex(hex, izi) 
  const quoter = new web3.eth.Contract(quoterJsonABI, quoterAddress);
  // const ret = await quoter.methods.swapAmount('1000000000000000000', hex).call();
  
  try{
    const ret = await quoter.methods.swapX2Y(
    usdc, usdt, 2000, '1000000000000000000', -100000
  ).call()
  console.log('ret: ', ret);
    } catch (err) {
      console.log('first err: ', err)
    }

  const ret1 = await quoter.methods.swapY2X(
    usdc, usdt, 2000, '1000000000000000000', -100000
  ).call()
  console.log('ret: ', ret1);
  // const calldata = quoter.methods.swapAmount('1000000000000000000', hex).encodeABI();
  // console.log('call data: ', calldata)
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
