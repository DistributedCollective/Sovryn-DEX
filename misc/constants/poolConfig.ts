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

export const sepoliaTestnetPoolConfigs: ISdexPoolInfo[] = [
    // Stable
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (DAI/eDLLR) --> means 1 DAI = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        initialRate: 1, // (tBTC/WBTC) --> means 1 tBTC = 1 WBTC
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
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
            tokenDeploymentName: "MOCK_WSTETH",
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
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "TBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1522 eSOV
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "MOCK_WSTETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "MOCK_POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.00000168, // paired to SOV (POWA/eSOV) --> means 1 POWA = 0.00000168 eSOV
        poolIdx: 38000,
    },
]

export const bobTestnetPoolConfigs: ISdexPoolInfo[] = [
    // Stable
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (DAI/eDLLR) --> means 1 DAI = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        initialRate: 1, // (tBTC/WBTC) --> means 1 tBTC = 1 WBTC
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
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
            tokenDeploymentName: "MOCK_WSTETH",
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
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "TBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1522 eSOV
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "MOCK_WSTETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 37000,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "MOCK_POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.00000168, // paired to SOV (POWA/eSOV) --> means 1 POWA = 0.00000168 eSOV
        poolIdx: 38000,
    },

    {
        baseToken: {
            tokenSymbol: "SolvBTC.BBN",
            tokenDeploymentName: "SolvBTC.BBN",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "MOCK_WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        initialRate: 1,
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "UniBTC",
            tokenDeploymentName: "UniBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "MOCK_WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        initialRate: 1,
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "SolvBTC.BBN",
            tokenDeploymentName: "SolvBTC.BBN",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "UniBTC",
            tokenDeploymentName: "UniBTC",
            isNativeToken: false,
        },
        initialRate: 1,
        poolIdx: 36000,
    },
]

export const bobMainnetMockPoolConfigs: ISdexPoolInfo[] = [
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (DAI/eDLLR) --> means 1 DAI = 1 eDLLR
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        initialRate: 1, // (tBTC/WBTC) --> means 1 tBTC = 1 WBTC
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
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
            tokenDeploymentName: "MOCK_WSTETH",
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
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "MOCK_USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "MOCK_DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.47,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.47 eSOV
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "TBTC",
            tokenDeploymentName: "MOCK_tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 31330,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1522 eSOV
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "MOCK_WSTETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "MOCK_rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 1522,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "MOCK_POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        initialRate: 0.00000168, // paired to SOV (POWA/eSOV) --> means 1 POWA = 0.00000168 eSOV
        poolIdx: 420,
    },
]

// @todo update the rate accordingly once we are deploying the real token
export const bobMainnetPoolConfigs: ISdexPoolInfo[] = [
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "USDT",
            isNativeToken: false,
        },
        initialRate: 1, // (USDC/USDT) --> means 1 USDC = 1 USDT
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "DLLR",
            isNativeToken: false,
        },
        initialRate: 1, // (USDT/eDLLR) --> means 1 USDT = 1 eDLLR
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "tBTC",
            tokenDeploymentName: "tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        initialRate: 0.9995, // (tBTC/WBTC) --> means 1 tBTC = 0.9995 WBTC
        poolIdx: 400,
    },

    // SOV Pairs
    {
        baseToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 0.56, // paired to SOV (eDLLR/eSOV) --> means 1 eDLLR = 0.56 eSOV
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 0.56,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "USDC",
            tokenDeploymentName: "USDC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 0.56,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "DAI",
            tokenDeploymentName: "DAI",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 0.56,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 32540, // paired to SOV (wBTC/eSOV) --> means 1 wBTC = 32540 SOV
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "TBTC",
            tokenDeploymentName: "tBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 32523,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 1651, // paired to SOV (ETH/eSOV) --> means 1 ETH = 1642 eSOV
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "wstETH",
            tokenDeploymentName: "wstETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 1915,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "rETH",
            tokenDeploymentName: "rETH",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 1824,
        poolIdx: 410,
    },
    {
        baseToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "POWA",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "SOV",
            isNativeToken: false,
        },
        initialRate: 0.000001502890173410, // @todo initial rate
        poolIdx: 420,
    },

    // LST
    {
        baseToken: {
            tokenSymbol: "UniBTC",
            tokenDeploymentName: "UniBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SolvBTC.BBN",
            tokenDeploymentName: "SolvBTC.BBN",
            isNativeToken: false,
        },
        initialRate: 0.9246268, // (UNIBTC / SolvBTC.BBN ) --> means 1 UNIBTC = 0.9246268 SolvBTC.BBN
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "SolvBTC.BBN",
            tokenDeploymentName: "SolvBTC.BBN",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "wBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        initialRate: 1,
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "UniBTC",
            tokenDeploymentName: "UniBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "wBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        initialRate: 0.9270480, // (UniBTC/wBTC) --> means 1 UniBTC = 0.9270480 wBTC
        poolIdx: 400,
    },
    {
        baseToken: {
            tokenSymbol: "SolvBTC",
            tokenDeploymentName: "SolvBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "wBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        initialRate: 1,
        poolIdx: 400,
    },

    // RUNE
    {
        baseToken: {
            tokenSymbol: "DOG",
            tokenDeploymentName: "DOG",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "POWA",
            tokenDeploymentName: "POWA",
            isNativeToken: false,
        },
        initialRate: 8062.1837, // (DOG/POWA) --> means 1 DOG = 8062.1837 POWA
        poolIdx: 420,
    },
    {
        baseToken: {
            tokenSymbol: "DOG",
            tokenDeploymentName: "DOG",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "wBTC",
            tokenDeploymentName: "wBTC",
            isNativeToken: false,
        },
        initialRate: 0.00000008248, // (DOG/wBTC) --> means 1 DOG = 0.00000008248 wBTC
        poolIdx: 420,
    },
]

export const SDEX_POOL_CONFIGS = {
    '0x0c576d': bobTestnetPoolConfigs, //bob testnet
    '0xed88': bobMainnetPoolConfigs, // @todo change to bobMainnetPoolConfigs for real token deployment
    '0xaa36a7' : sepoliaTestnetPoolConfigs,
}