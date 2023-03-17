require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan');
require("dotenv").config({ path: ".env" });

const NEXT_PUBLIC_QUICKNODE_HTTP_URL = process.env.NEXT_PUBLIC_QUICKNODE_HTTP_URL;
const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const NEXT_PUBLIC_POLYGONSCAN_KEY = process.env.NEXT_PUBLIC_POLYGONSCAN_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: NEXT_PUBLIC_QUICKNODE_HTTP_URL,
      accounts: [NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: NEXT_PUBLIC_POLYGONSCAN_KEY,
    },
  },
};