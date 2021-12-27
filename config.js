require("dotenv").config();
const ethers = require("ethers");

module.exports = {
  OWNER_PRIVATE_KEY: process.env.OWNER_PRIVATE_KEY,
  HARDHAT: {
    FORK: {
      BLOCK_NUMBER: process.env.HARDHAT_FORK_BLOCK_NUMBER && Number(process.env.HARDHAT_FORK_BLOCK_NUMBER),
      NETWORK: process.env.HARDHAT_FORK_NETWORK,
    },
    SHOW_LOGS: process.env.HARDHAT_SHOW_LOGS === "true",
  },
  GAS_LIMIT: process.env.GAS_LIMIT ? ethers.utils.hexlify(Number(process.env.GAS_LIMIT)) : undefined,
  GAS_PRICE: Number(process.env.GAS_PRICE) || undefined,
  MAINNET_RPC_URL: process.env.MAINNET_RPC_URL || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  ROPSTEN_RPC_URL: process.env.ROPSTEN_RPC_URL || "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  POLYGON_RPC_URL: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com"
};
