const { ethers } = require("hardhat");

const createLeaf = (address, quantity) => Buffer.from(
  ethers.utils.solidityKeccak256(["address", "uint256"], [address, quantity]).slice(2),
  "hex"
);

const getLeavesFromWhitelist = (whitelist) => Object.entries(whitelist)
  .sort(([keyA], [keyB]) => {
    if (keyA > keyB) return -1;
    if (keyB > keyA) return 1;
    return 0;
  })
  .map((entry) => createLeaf(...entry));

module.exports = {
  getLeavesFromWhitelist,
  createLeaf
};
