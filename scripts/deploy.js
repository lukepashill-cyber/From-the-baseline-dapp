const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("Deploying TennisMatches contract to BlockDAG...");

  const TennisMatches = await hre.ethers.getContractFactory("TennisMatches");
  const contract = await TennisMatches.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`✅ Contract deployed to: ${address}`);
  console.log(`\n📝 Save this address to your .env file:`);
  console.log(`REACT_APP_CONTRACT_ADDRESS=${address}`);

  // Verify on block explorer
  console.log(`\n🔍 View on BlockDAG Explorer:`);
  console.log(`https://explorer.blockdag.works/address/${address}`);

  // Wait for confirmations before verification
  console.log("\n⏳ Waiting for confirmations...");
  await contract.deploymentTransaction().wait(5);

  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
