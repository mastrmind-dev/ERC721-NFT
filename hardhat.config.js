require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  // defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
    },
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: []
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/PPT8_0p08mlvodQAMMxn93kYxlMyf7mG",
      accounts: ["5da121d1e61c94c5cf5a8cc9ec335e655804829a56ccbb09a0115d2e5c631961"]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}