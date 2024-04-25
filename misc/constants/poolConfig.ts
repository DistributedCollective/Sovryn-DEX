import { ethers } from "hardhat";

interface SdexPoolConfigTokenDetail {
    tokenAddress: string;
    poolIdx: number;
    initialRate: number
}

export interface ITokenInfo {
    tokenAddress?: string,
    tokenSymbol: string,
    tokenDeploymentName: string,
    isNativeToken: boolean,
}

export interface ISdexPoolInfo {
    baseToken: ITokenInfo,
    quoteToken: ITokenInfo,
    initialRate: number,
    poolIdx: number,
}

export const bobTestnetPoolConfigs: ISdexPoolInfo[] = [
    // Stable
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK2_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK2_USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK2_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (DAI/eDLLR) --> means 1 DAI = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK2_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "MOCK2_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK2_WBTC",
            isNativeToken: false,
        },
        initialRate: 1, // (tBTC/WBTC) --> means 1 tBTC = 1 WBTC
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK2_rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        initialRate: 1, // paired to SOV (rETH/ETH) --> means 1 rETH = 1 ETH
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "MOCK2_WSTETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        initialRate: 1, // paired to SOV (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 36000,
    },

    // SOV Pairs
    {
        baseToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 0.47, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK2_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 31330, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 1522, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1522 eSOV
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "MOCK2_POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 0.00000168, // paired to SOV (POWA/eSOV) --> means 1 POWA = 0.00000168 eSOV
        poolIdx: 36000,
    },
]

export const bobMainnetPoolConfigs: ISdexPoolInfo[] = [
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK2_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK2_USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK2_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (DAI/eDLLR) --> means 1 DAI = 1 eDLLR
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK2_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "MOCK2_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK2_WBTC",
            isNativeToken: false,
        },
        initialRate: 1, // (tBTC/WBTC) --> means 1 tBTC = 1 WBTC
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK2_rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        initialRate: 1, // paired to SOV (rETH/ETH) --> means 1 rETH = 1 ETH
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "MOCK2_WSTETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        initialRate: 1, // (wstETH/ETH) --> means 1 wstETH = 1 ETH
        poolIdx: 400,
    },

    // SOV Pairs
    {
        baseToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 0.47, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK2_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 31330, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 1522, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1522 eSOV
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "MOCK2_POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        initialRate: 0.00000168, // paired to SOV (POWA/eSOV) --> means 1 POWA = 0.00000168 eSOV
        poolIdx: 400,
    },
]

export const SDEX_POOL_CONFIGS = {
    '0x6f': bobTestnetPoolConfigs, //bob testnet
    '0xed88': bobMainnetPoolConfigs
}