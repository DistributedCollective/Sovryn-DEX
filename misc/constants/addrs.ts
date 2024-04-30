import { ethers } from "hardhat"

// Convention is to use empty string for pre-deployed contract
export interface SdexAddrs {
    dex: string,
    cold: string,
    warm: string,
    long: string,
    micro: string,
    hot: string,
    knockout: string,
    koCross: string,
    policy: string,
    query: string,
    impact: string,
    shell: string,
    swapRouter?: string,
    swapBypass?: string,
    policyShell: string,
    deployer: string,
    govern: SdexGovAddrs,
}

export interface SdexGovAddrs {
    multisigTreasury: string,
    multisigOps: string,
    multisigEmergency: string,
    timelockTreasury: string,
    timelockOps: string,
    timelockEmergency: string,
}

const emptyGovAddrs: SdexGovAddrs = {
    multisigTreasury: "",
    multisigOps: "",
    multisigEmergency: "",
    timelockTreasury: "",
    timelockOps: "",
    timelockEmergency: "",
}

const emptyAddrs: SdexAddrs = {
  dex: "",
  cold: "",
  warm: "",
  long: "",
  micro: "",
  hot: "",
  knockout: "",
  koCross: "",
  policy: "",
  query: "",
  impact: "",
  shell: "",
  policyShell: "",
  deployer: "", 
  govern: emptyGovAddrs,
  swapRouter: "",
  swapBypass: "",
}

// Mock used in local forks
const mockAddrs: SdexAddrs = {
    dex: '0xAAAAaAAa7A116286168fe3733f994062bc73CbF3',
    cold: '0xC469e7aE4aD962c30c7111dc580B4adbc7E914DD',
    warm: '',
    long: '',
    micro: '',
    hot: '',
    knockout: '',
    koCross: '',
    policy: '0x43ca3D2C94be00692D207C6A1e60D8B325c6f12f',
    query: '',
    impact: '',
    shell: '',
    policyShell: '',
    deployer: '0x73511669fd4de447fed18bb79bafeac93ab7f31f',
    govern: emptyGovAddrs
}

// Mainnet

const bobMainnetAddrs: SdexAddrs = {
  dex: '0xe5bc234A484A912A61Aa74501960cFc202e773dA',
  cold: '0xA17B99B2817d0EdD992fE00D219DEc2b9835742d',
  warm: '0xc442ce6a859d3155B4c1347dD424ad11a936f560',
  long: '0x7B794a3101594EC9aF48eF505E9f18DFbe966315',
  micro: '0x3beb724c3c2b8ae0DfCe74015B21f6cf962D9881',
  hot: '0xdC3e5232db60088D67aA7AF10595979D7eB5290f',
  knockout: '0x67bF6DE7f8d4d13FBa410CBe05219cB26242A7C9',
  koCross: '0xa98320ac64923049f1b56c943656f30026402c64',
  policy: '0x22Bdd8B71928003473EfA83cd69689cc04507cd9',
  query: '0xf1e7167A0b085B52A8ad02A5Cc48eD2027b8B577',
  impact: '0x30B2a8810B091D1DbE4aAA4905141f815586e274',
  shell: '',
  policyShell: '',
  deployer: '0xac2d05A148aB512EDEDc7280c00292ED33d31f1A',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  },
  swapRouter: "0x9f93D654a1cdC128c27F99Af5452b26d8002e607",
  swapBypass: "0x7b96cC2256e94348a678B554e2fC648D13b1560E",
}

const bobTestnetAddrs: SdexAddrs = {
  dex: '0xA86F239490bd35923eCBD578C2A8989803294bee',
  cold: '0x9be3Fe2420EE934156CC55817a97b79454596403',
  warm: '0xd5d7c42D3de2c9cF1245a9889e823Ce6e75C4391',
  long: '0x132Ff2e340e1653946EC53125a9131C9269a40c3',
  micro: '0xeFF6b1dD5E8c11a59554084AE36506a28fc3F6e8',
  hot: '0x5c7bEa38BD9d825212a1BCf0cCA4b9C122f6Bd00',
  knockout: '0x59c4DBa2F8413e02455A60Af1AF6CbD37d710735',
  koCross: '0x9228378287e43eFe94890D8d0C47deBCBe54F7F3',
  policy: '0x8aC0bf8dd950616878A6466c5B1E7e291403a5a6',
  query: '0x9d9Fd4127E988B95E25F058cf11B274ffA98801E',
  impact: '0xdB0Bb1e4b7aA5a747E17957FC66C772cea089ec5',
  shell: '',
  policyShell: '',
  deployer: '0x1a612d26bB8d612c66F8c6ee345afd7e7936c32a',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  }
}

const tenderlyVirtualNetworkAddrs: SdexAddrs = {
  dex: '',
  cold: '',
  warm: '',
  long: '',
  micro: '',
  hot: '',
  knockout: '',
  koCross: '',
  policy: '',
  query: '',
  impact: '',
  shell: '',
  policyShell: '',
  deployer: '',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  },
  swapRouter: '',
  swapBypass: ''
}

const sepoliaAddrs: SdexAddrs = {
  dex: '0xad2Ef29985c20d5980dE28c3CbBD0355AB29F9A4',
  cold: '0xaDB7dCC11EE934E44BeAa66A324d55e57CEC33F4',
  warm: '0xb377e2cF944F5Cc174aa8FE5d4Aaf3f7e56Ec63e',
  long: '0x0C9F706449241ab5E6218ea6aE5B107787F4D150',
  micro: '0xb73B2F12a0bc161010D1aAcADAD61C1b1b92F3a4',
  hot: '0x238A1174f1D788D3d47fd51499DFFaECd0C50478',
  knockout: '0x2B8D05B69FC017FA00cB152499bE459DF3C97742',
  koCross: '0xdaBAeAc51Faf71abb715C2039DCa95896B523616',
  policy: '0x4B319A82a0064944adaA4373b93e3e264D9067c0',
  query: '0xa3Ede3d94493BA944715a036833c0D6E36E0c52c',
  impact: '0x8AC7f31B587A2369C985b05627873cFA50C70a3C',
  shell: '',
  policyShell: '',
  deployer: '0x609Ac40043aea999b7d8b7eE8B6e094b32ff4757',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  },
  swapRouter: '0xbF78d668a90Eac8C1a247C631a07dcC169428658',
  swapBypass: '0x18Ca1b9F9595D402f1a03b0262288a15760D028C'
}

const sepoliaForkedAddrs: SdexAddrs = {
  dex: '',
  cold: '',
  warm: '',
  long: '',
  micro: '',
  hot: '',
  knockout: '',
  koCross: '',
  policy: '',
  query: '',
  impact: '',
  shell: '',
  policyShell: '',
  deployer: '',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  }
}

export let SDEX_ADDRS = {
    '0x6f': bobTestnetAddrs,
    '0xed88': bobMainnetAddrs,
    '': tenderlyVirtualNetworkAddrs,
    '0xaa36a7': sepoliaAddrs, // keep in lower case
    '0x7a69': sepoliaForkedAddrs,
    'mock': mockAddrs,
}

export let POOL_IDXS = {
    '0x6f': {
      "01": 36000,
      "035": 37000,
      "05": 38000,
    }, // BOB testnet
    '0xed88': {
      "01": 400,
      "035": 410,
      "05": 420,
    }, // BOB mainnet
    '0xaa36a7': {
      "01": 36000,
      "035": 37000,
      "05": 38000,
    }, // sepolia
    '0x7a69': 36000, // hh local fork
}

export const BOOT_PROXY_IDX = 0;
export const SWAP_PROXY_IDX = 1;
export const LP_PROXY_IDX = 128;
export const COLD_PROXY_IDX = 3;
export const LONG_PROXY_IDX = 130;
export const MICRO_PROXY_IDX = 131;
export const KNOCKOUT_LP_PROXY_IDX = 7;
export const FLAG_CROSS_PROXY_IDX = 3500;
export const SAFE_MODE_PROXY_PATH = 9999;

