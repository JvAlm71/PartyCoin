require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: '../.env' });

const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "localhost", // mudou aqui para localhost
  networks: {
    hardhat: {
      chainId: 31337,
      mining: {
        auto: true,
        interval: 1000
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    sepolia: {
      url: sepoliaRpcUrl || "",
      accounts: privateKey ? [`0x${privateKey}`] : [],
      chainId: 11155111
    },
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
  },
};