/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";
import "hardhat-contract-sizer"
import "@nomicfoundation/hardhat-verify";
import "hardhat-function-signatures";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
require("@secrez/cryptoenv").parse();

import "./hardhat/tasks/index.ts";

const mnemonic = { mnemonic: "test test test test test test test test test test test junk" };
const testnetPKs = [
    process.env.WALLET_KEY ?? "",
    process.env.TESTNET_SIGNER_PRIVATE_KEY ?? "",
    process.env.TESTNET_SIGNER_PRIVATE_KEY_2 ?? "",
].filter((item, i, arr) => item !== "" && arr.indexOf(item) === i);
const testnetAccounts = testnetPKs.length > 0 ? testnetPKs : mnemonic;

const mainnetPKs = [
    process.env.WALLET_KEY ?? "", // shared account
    process.env.TESTNET_DEPLOYER_PRIVATE_KEY ?? "", //mainnet signer2
    process.env.MAINNET_DEPLOYER_PRIVATE_KEY ?? "",
    process.env.PROPOSAL_CREATOR_PRIVATE_KEY ?? "",
].filter((item, i, arr) => item !== "" && arr.indexOf(item) === i);
const mainnetAccounts = mainnetPKs.length > 0 ? mainnetPKs : mnemonic;

require("hardhat-storage-layout");
require('solidity-coverage')

module.exports = {
    solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000
          },
          outputSelection: {
            "*": {
                "*": ["storageLayout"],
              },
         },
        }
        },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000
          },
          outputSelection: {
            "*": {
                "*": ["storageLayout"],
              },
         },
        }
        },
      
    ],
      overrides: {
      },
      
    },
    namedAccounts: {
      deployer: {
          default: 0,
      },
    },
    networks: {
      local: {
         url: 'http://127.0.0.1:8545',
         chainId: 31337
      },
      
      ethMainnet: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
        chainId: 1
      },

      sepolia: {
        chainId: 11155111,
        url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
        accounts: testnetAccounts,
        tags: ['testnet'],
      },

      sepoliaForked: {
        chainId: 31337,
        accounts: testnetAccounts,
        url: "http://127.0.0.1:8545",
        tags: ['testnet', 'forked'],
      },

      bobMainnet: {
        url: 'https://rpc.gobob.xyz/',
        chainId: 60808,
        accounts: mainnetAccounts,
        live: true,
        //gasPrice: 50000000,
        blockGasLimit: 30000000,
      },

      bobTestnet: {
        url: 'https://bob-sepolia.rpc.gobob.xyz/',
        chainId: 808813,
        accounts: testnetAccounts,
        gasPrice: 50000000,
      },

      bobForkedTestnet: {
          chainId: 31337,
          accounts: testnetAccounts,
          url: "http://127.0.0.1:8545",
          blockGasLimit: 6800000,
          gasPrice: 50000000,
          live: true,
          tags: ["mainnet", "forked"],
          timeout: 1000000,
      },

      bobForkedMainnet: {
          chainId: 31337,
          accounts: mainnetAccounts,
          url: "http://127.0.0.1:8545",
          blockGasLimit: 6800000,
          gasPrice: 50000000,
          live: true,
          tags: ["mainnet", "forked"],
          timeout: 1000000,
      },

      tenderlyVirtualNetwork: { // @todo deploy a new virtual network on tenderly
        url: '',
        chainId: 0x0000,
        accounts: testnetAccounts,
        // gasPrice: 50000000,
      }
    },
    external: {
      contracts: [
          {
              artifacts: "external/artifacts",
              // deploy: "node_modules/@cartesi/arbitration/export/deploy",
          },
          //{
          //artifacts: "node_modules/someotherpackage/artifacts",
          //},
      ],
      deployments: {
          sepolia: ["external/deployments/sepolia"],
          sepoliaForked: [
              "external/deployments/sepolia",
              "deployment/deployments/sepolia",
              "external/deployments/sepoliaForked",
          ],
          
          bobTestnet: ["external/deployments/bobTestnet"],
          bobForkedTestnet: [
              "external/deployments/bobTestnet",
              "deployment/deployments/bobTestnet",
              "external/deployments/bobForkedTestnet",
          ],
          bobMainnet: ["external/deployments/bobMainnet"],
          bobForkedMainnet: [
              "external/deployments/bobMainnet",
              "deployment/deployments/bobMainnet",
              "external/deployments/bobForkedMainnet",
          ],
          ethMainnet: ["external/deployments/ethMainnet"],
          ethForkedMainnet: [
              "external/deployments/ethMainnet",
              "deployment/deployments/ethMainnet",
              "external/deployments/ethForkedMainnet",
          ],
          ethSepoliaTestnet: ["external/deployments/ethSepoliaTestnet"],
          tenderlyForkedEthMainnet: [
              "external/deployments/ethMainnet",
              "deployment/deployments/ethMainnet",
              "external/deployments/tenderlyForkedEthMainnet",
          ],
      },
    },
    etherscan: {
        apiKey: {
          bobMainnet: "QYYYEVDHH56KXRW8DNCF6S1AYS9RTRZ1HF",
          bobTestnet: "QYYYEVDHH56KXRW8DNCF6S1AYS9RTRZ1HF",
        },
        customChains: [
          {
            network: "bobTestnet",
            chainId: 808813,
            urls: {
              apiURL: "https://bob-sepolia.explorer.gobob.xyz/api/",
              browserURL: "https://bob-sepolia.explorer.gobob.xyz/"
            }
          },
          {
            network: "bobMainnet",
            chainId: 60808,
            urls: {
              apiURL: "https://explorer.gobob.xyz/api/",
              browserURL: "https://explorer.gobob.xyz/"
            }
          }
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        deploy: "./deployment/deploy",
        deployments: "./deployment/deployments",
    },
    mocha: {
      timeout: 1000000,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
        alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
        externalArtifacts: ["external/artifacts"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
        // externalArtifacts: ["external/artifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    },
};
