/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();


require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity:{
    version : "0.8.0" 
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    }  
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  localhost: {
    url: "http://localhost:8545",
  },
};
