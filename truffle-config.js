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
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.16"
    }
  }
};
