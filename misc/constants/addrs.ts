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
    safeMode?: string,
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
  safeMode: "",
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
  cold: '0x4AC1fda4171bC77cf23Be54529E0CF135f6b9B93',
  warm: '0xFA57d9d1Db4676099e67215906f2F681d7730882',
  long: '0x44F220aa5434901E92b0B9F1D1F3Be068BA29099',
  micro: '0x2D4C9B0A213a61ef0ce2a6D5eB6101C63404F173',
  hot: '0xf01621D8ae78Ba9349ebF417a02FeD6f28A5798E',
  knockout: '0x9b17A13D396b9Ca36B493729dD05b076e1f18E83',
  koCross: '0xa65B8E861c5e7672013cDD05853915C6f24ce19D',
  policy: '0x22Bdd8B71928003473EfA83cd69689cc04507cd9',
  query: '0x1dff4Ff93dF17Ad6F44E23368341CcFb8fB8B675',
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
  swapRouter: '0x9f93D654a1cdC128c27F99Af5452b26d8002e607',
  swapBypass: '0x7b96cC2256e94348a678B554e2fC648D13b1560E',
  safeMode: '0x6087EbE47fb43Fd56fA71eDe6f9035b777F21862'
}

const bobTestnetAddrs: SdexAddrs = {
  dex: '0x6E47BC2BC7CF8383369BbA36F520323C5F16dC1C',
  cold: '0x16ca12702BF1cf671548c904ace633aF3cCa33dd',
  warm: '0xEdEF1E6d570317a7Cb65EA1eDBb18C0184BD4C70',
  long: '0x820baF06b193143718308B8ef3b19C1490202cFf',
  micro: '0x41b5f6584b22ac5b118e013eA3289b85C8E25D89',
  hot: '0x4d9dB3FA7007e59Ac93e5FCc1bE872182d2EE07c',
  knockout: '0x67519D48d57C94714b76d678B0998a525C1A362F',
  koCross: '0x28A6328B0e167035F33a4C58374F2524Ae9c8dC1',
  policy: '0x304E007A6e093dE6e047563a1Ebb82e11BDceaf5',
  query: '0x9f3c6138fCE0878D6ABD986e3c2Cb0B36E6b0E84',
  impact: '0x56c1F530BF3C81f729EBA05b7BFbf5daA48C875b',
  shell: '',
  policyShell: '0x304E007A6e093dE6e047563a1Ebb82e11BDceaf5',
  deployer: '0xbF78d668a90Eac8C1a247C631a07dcC169428658',
  govern: {
    multisigTreasury: '',
    multisigOps: '',
    multisigEmergency: '',
    timelockTreasury: '',
    timelockOps: '',
    timelockEmergency: ''
  },
  safeMode: '0x0448A93aDf3C171D25486a6Ecb88588f19642CA0',
  swapRouter: '0x9F6dD52C51D50e3C2Dce847d2a88067bDcB65500',
  swapBypass: '0x806305A4222905CB0a083391d18795F52B8d462c',
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
  swapBypass: '',
  safeMode: '',
}

const sepoliaAddrs: SdexAddrs = {
  dex: '0xad2Ef29985c20d5980dE28c3CbBD0355AB29F9A4',
  cold: '0x45d9cFf7c9071b20395DFd67e1194DB3094b0B51',
  warm: '0x84bD0D81001235cF8A0A863D289a79F43299619D',
  long: '0x3Fbaa86eda2aCD02702581b30cD331725C3C1fF1',
  micro: '0xF5F70ab084E3799AFEE43830EA2be06F3F4064AE',
  hot: '0x581f657AD3430b52754DDcC604cf73Bc8C55bED9',
  knockout: '0xc3E104dEE1A8716c457d2D6d6BdeF0651BBd3787',
  koCross: '0xfEE24294a8dE378E5d7B1F6004E900C864a5A998',
  policy: '0x4B319A82a0064944adaA4373b93e3e264D9067c0',
  query: '0x0E0BA5F71a7CC8EF067d82c03A8cd7761f4810cd',
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
  swapBypass: '0x18Ca1b9F9595D402f1a03b0262288a15760D028C',
  safeMode:'',
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
    '0x0c576d': bobTestnetAddrs,
    '0xed88': bobMainnetAddrs,
    '': tenderlyVirtualNetworkAddrs,
    '0xaa36a7': sepoliaAddrs, // keep in lower case
    '0x7a69': sepoliaForkedAddrs,
    'mock': mockAddrs,
}

export let POOL_IDXS = {
    '0x0c576d': {
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

