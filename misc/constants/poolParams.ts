import { BigNumberish } from "ethers"
import { ethers } from "hardhat"

export interface SdexOnePoolParams {
    jitThresh: number,
    tickSize: number
    feeBps: number,
    knockoutOn: boolean
}

export interface SdexCrossPoolParams {
    initLiq: BigNumberish
}

export interface SdexPoolParams {
    universal: SdexCrossPoolParams
    stdPoolIdx: number
    stdPoolParams: SdexOnePoolParams
}

const mainnetParams: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 420,
    stdPoolParams: {
        jitThresh: 30,
        tickSize: 16,
        feeBps: 27,
        knockoutOn: true
    }
}

const l2TestnetParams: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 36000,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 1,
        feeBps: 15,
        knockoutOn: true
    }
}

const bobTestnetParams01: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 36000,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 1,
        feeBps: 10,
        knockoutOn: true
    }
}

const bobTestnetParams035: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 37000,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 1,
        feeBps: 35,
        knockoutOn: true
    }
}

const bobTestnetParams05: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 38000,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 1,
        feeBps: 50,
        knockoutOn: true
    }
}

// @todo activate this for pool deployment
// 0.1% fee
const bobMainnetParams01: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 400,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 4,
        feeBps: 10,
        knockoutOn: true
    }
}

// 0.35% fee
const bobMainnetParams035: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 410,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 4,
        feeBps: 35,
        knockoutOn: true
    }
}

// 0.5% fee
const bobMainnetParams05: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 420,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 4,
        feeBps: 50,
        knockoutOn: true
    }
}

const l2MainnetParams: SdexPoolParams = {
    universal: {
        initLiq: 10000
    },
    stdPoolIdx: 420,
    stdPoolParams: {
        jitThresh: 10,
        tickSize: 4,
        feeBps: 15,
        knockoutOn: true
    }
}

const goerliDryRunParams = mainnetParams

export const SDEX_POOL_PARAMS = {
    '0x1': mainnetParams,
    '0x5': goerliDryRunParams,
    '0x8274f': l2TestnetParams,
    '0x82750': l2MainnetParams,
    '0x94258': bobTestnetParams035,
    '0x1B669': bobTestnetParams035,
    '0x97114F': bobTestnetParams035,
    '0x80D': l2TestnetParams,
    '0xaa36a7': l2TestnetParams, //sepolia
    '0x6f': bobTestnetParams01, //bob testnet
    '0xed88': bobMainnetParams01  // @todo activate this for bob mainnet deployment
}
