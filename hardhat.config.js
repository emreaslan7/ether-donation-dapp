/** @type import('hardhat/config').HardhatUserConfig */

 

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity:{
    version : "0.8.0" 
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  localhost: {
    url: "http://localhost:8545",
  },
};
