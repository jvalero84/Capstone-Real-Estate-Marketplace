const HDWalletProvider = require('truffle-hdwallet-provider')
const web3 = require('web3')
//const MNEMONIC = process.env.MNEMONIC
const PK = "Your metamask mnemonic..."
const INFURA_KEY = "Your infura key..."
const FACTORY_CONTRACT_ADDRESS = "0x45460513d9352c9216E67d5aCedc1E531414C697"
const OWNER_ADDRESS = "0x765A6B5fB4aBE2381bC2Be4928F3D09C978dc5BB"
const NUM_TOKENS = 10


const FACTORY_ABI = 
[
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256[2]",
        "name": "a",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "b",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "c",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "input",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]



async function main() {
  const network = 'rinkeby';

  const provider = new HDWalletProvider(
    PK,
    `https://${network}.infura.io/v3/${INFURA_KEY}`
  )
  const web3Instance = new web3(provider)

// Load proofs..
var proofs = [];
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof1.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof2.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof3.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof4.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof5.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof6.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof7.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof8.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof9.json"));
proofs.push(require("/Users/jvalero/DEV/workspaces/blockchain_developer_nd/Capstone-Real-Estate-Marketplace/zokrates/code/square/proofs/proof10.json"));
console.log(proofs.length);


  if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: '1000000' }
    )

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_TOKENS; i++) {
      const result = await factoryContract.methods
        //.mint(i, a, b, c, input)
        .mint(proofs[i].proof.a,
                    proofs[i].proof.b,
                    proofs[i].proof.c,
                    proofs[i].inputs,
                    i+1,
                    OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS })
      console.log('Minted Token. Transaction: ' + result.transactionHash)
    }

  } else {
    console.error(
      'Add FACTORY_CONTRACT_ADDRESS to the environment variables'
    )
  }
}


main()
