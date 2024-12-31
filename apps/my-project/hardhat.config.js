require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      chainId: 80002,
      accounts: ["adf60c0784b3d7d21c5c34f2b609b7ec9c363ac4eb29189ee76cd734f3ac901f"],
    },
  },
};
//0xBeF10746E72eCB07215D7b7e7d4ca1eC71ab4937