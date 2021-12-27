require("log-timestamp");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { removeConsoleLog } = require("hardhat-preprocessor");
const config = require("./config");

console.log("Showing hardhat logs:", config.HARDHAT.SHOW_LOGS);

module.exports = {
  defaultNetwork: "hardhat",
  preprocess: {
    eachLine: removeConsoleLog(() => !config.HARDHAT.SHOW_LOGS)
  },
  solidity: "0.8.4",
  paths: {
    sources: "./contracts"
  },
  networks: {
    hardhat: {
      ...(config.HARDHAT.FORK.NETWORK && {
        forking: {
          url: config.HARDHAT.FORK.NETWORK,
          ...(config.HARDHAT.FORK.BLOCK_NUMBER && { blockNumber: config.HARDHAT.FORK.BLOCK_NUMBER })
        }
      })
    },
    mainnet: {
      url: config.MAINNET_RPC_URL,
      gasMultiplier: 1.15,
    },
    ropsten: {
      url: config.ROPSTEN_RPC_URL,
      gas: "auto",
    },
    polygon: {
      url: config.POLYGON_RPC_URL,
      gas: "auto",
    },
  }
};
