
const hardhat = require("hardhat");
const config = require("../config");
const { ethers } = hardhat;

const main = async () => {
  const deployer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY).connect(ethers.provider);
  const Collectible = await ethers.getContractFactory("Survey", deployer);
  
  const publicKey = deployer.publicKey;
  const balance = ethers.utils.formatEther(await ethers.provider.getBalance(deployer.address));
  console.log(
    "About to deploy in", hardhat.network.name,
    "with Address:", deployer.address,
    "Public Key:", publicKey,
    "Balance:", balance, "ETH"
  );

  await sleepSeconds(3);

  console.log("Deploying...");
  const instance = await Collectible.deploy(
    process.env.DEPLOYMENT_COOLDOWN_SECONDS || 3600,
    {
      gasLimit: config.GAS_LIMIT,
      gasPrice: config.GAS_PRICE
    }
  );
  console.log("Transaction hash:", instance.deployTransaction.hash);
  await instance.deployed();
  await instance.deployTransaction.wait();
  
  console.log("Smart contract deployed succesfully at address:", instance.address);
};

const sleepSeconds = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying the contract", error);
    process.exit(1);
  });
