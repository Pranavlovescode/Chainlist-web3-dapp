const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

module.exports = {
  contracts_build_directory: "./client/src/contracts",
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    loc_development_development: {
      network_id: "*",
      port: 6545,
      host: "127.0.0.1"
    },
    sepolia:{
      provider: ()=>{
        return new HDWalletProvider(process.env.MNEMONIC,'https://sepolia.infura.io/v3/'+process.env.INFURA_API_KEY)
      },
      network_id:"*",
      gas: 4500000,
      gasPrice: 10000000000 
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.16"
    }
  }
};
