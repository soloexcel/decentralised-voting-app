// const hre = require("hardhat")
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const fs = require("fs") //file system

async function main() {
	//deploy the contract
	const Election = await ethers.getContractFactory("Election");

	// deploy the contract
	const election = await Election.deploy()

	// wait for the contract to finish deploying
	await election.deployed();

	// save the contract address to a local file.
	fs.writeFileSync('./context/config.js', 
  `
  import election from "./Election.json"

  export const contractAddress = "${election.address}";
  export const ownerAddress = "${election.signer.address}";
  export const electionABI = election.abi;
  `) 

  console.log("Open the ./context/config.js file to find the deployment details.");

  // print the address of the deployed contract
  console.log("Verify Contract Address:", election.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000);

    // Verify the contract after deploying
    await hre.run("verify:verify", {
      address: election.address,
      constructorArguments: [],
    });
  

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });