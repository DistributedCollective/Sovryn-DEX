import { ITokenInfo } from "./poolConfig";

export interface ISdexLpTokenInfo {
    baseToken: ITokenInfo;
    quoteToken: ITokenInfo;
    poolIdx: number;
    lpTokenAddress: string;
}

export const bobMainnetLpTokenConfigs: ISdexLpTokenInfo[] = [
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
        poolIdx: 400,
        lpTokenAddress: "0x4E686Dff59A51A948ea9Cc8C44FF0b32cba6e62a"
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "DLLR",
            isNativeToken: false,
        },
        lpTokenAddress: "0x2E41CD9805592b3A536EeE6286CC8FCFb3DFd9F2",
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
        lpTokenAddress: "0x02eB05fa5A5da14B54d6b7d5044e5343c01126EB",
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
        lpTokenAddress: "0x0034a1EaCDa61619Bd9D1CEDA101189A0EF871F9",
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
        lpTokenAddress: "0xdC1f62679a25bB9d568463ce007a3b91D01448FD",
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
        lpTokenAddress: "0xf59720432AA266D4B077efE659EEb36923f41Da2",
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
        lpTokenAddress: "0xEb92Ae0ce520D099b0FB51Ef297f581c5AB57dbf",
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
        lpTokenAddress: "0x165b73022AE5601494c3a200f92114736BD3Cfca",
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
        lpTokenAddress: "0xB4e9fAaF39d95E396E588A0CdD70f3a9E79286be",
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
        lpTokenAddress: "0x594726E3B10bb5402279cBf745fC597041a6f1cF",
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
        lpTokenAddress: "0xBd696d1a6E09D051dDce2d7DcDDD6B6Bf082f8AA",
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
        lpTokenAddress: "0xE668D03C31f78713952953cE6f345b1D0137B754",
        poolIdx: 410,
    },
]

export const bobTestnetLpTokenConfigs: ISdexLpTokenInfo[] = [
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
        poolIdx: 36000,
        lpTokenAddress: "0x7803099d2d7774989dEe0862142d7226aD0D1bE0"
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
        lpTokenAddress: "0x3c4BD6408b1a5B30d477A21fa7D37C172E7AbF5D",
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        lpTokenAddress: "0x76b43A1D4B31988F7Dd35E7AB11C844226B0B619",
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
        lpTokenAddress: "0x39B408792C1D79963BA5Ad11F0EBbA78A89f9Bb3",
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
        lpTokenAddress: "0x30EA200eAb8f81a64d6137c23Fd35e221461B79C",
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
        lpTokenAddress: "0x1BAdd6f3E68a07876Ca87ac065bc0bD375794308",
        poolIdx: 36000,
    },

    // SOV Pairs
    {
        baseToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        lpTokenAddress: "0xdf3E204f251fBA7d2830f7650e93E4D0Ff326c66",
        poolIdx: 37000,
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
        lpTokenAddress: "0xdcd5E442720D8c997143a6406bC9FB42FF62eD92",
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
        lpTokenAddress: "0xF6f49BAEd1cb08e9fC12a9052Da54435772cD01C",
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
        lpTokenAddress: "0x83FB68d90fb2D9a04b34C2534A85ce587ffCfB0e",
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
        lpTokenAddress: "0xf59720432AA266D4B077efE659EEb36923f41Da2",
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
        lpTokenAddress: "0xf6ebf43f5a28CB9ecEea60234E60d87AF347CCF3",
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
        lpTokenAddress: "0xdC1f62679a25bB9d568463ce007a3b91D01448FD",
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
        lpTokenAddress: "0xC866AC350A893c8072618f63cfaF6d75796b4c9F",
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
        lpTokenAddress: "0x4dDe2ea732609e886F578D0BD5B8b9A31FB10Ced",
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
        lpTokenAddress: "0x165b73022AE5601494c3a200f92114736BD3Cfca",
        poolIdx: 38000,
    },
]

export const sepoliaLpTokenConfigs: ISdexLpTokenInfo[] = [
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
        poolIdx: 36000,
        lpTokenAddress: "0x48E5EBE5B2Cf7ED1b40234CFBB76F4E107145897"
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
        lpTokenAddress: "0x64f834303f65e62ba53F3D182EF1d86C993bcC9F",
        poolIdx: 36000,
    },
    {
        baseToken: {
            tokenSymbol: "USDT",
            tokenDeploymentName: "MOCK_USDT",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        lpTokenAddress: "0x032d19fAEcC286143F983e4af49eC0c8bb86E067",
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
        lpTokenAddress: "0x2167635648024324b43Ca0799Ed6391bBb0A10b5",
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
        lpTokenAddress: "0xe82E144B8E5453A8b079a1C8be7CDc754B7eB3fE",
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
        lpTokenAddress: "0x7e40E587f22A0b415c23f8b5c41ed1033b7385bA",
        poolIdx: 36000,
    },

    // SOV Pairs
    {
        baseToken: {
            tokenSymbol: "DLLR",
            tokenDeploymentName: "MOCK_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "SOV",
            tokenDeploymentName: "MOCK_SOV",
            isNativeToken: false,
        },
        lpTokenAddress: "0xBbe7799C79a27988d323d7487258A87DF323f063",
        poolIdx: 37000,
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
        lpTokenAddress: "0x6dFF4382911497A3fB6eC457b2f66E225EA474C6",
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
        lpTokenAddress: "0x2E29C37c99EAf6e20de95E14B34ef6152Ef12D7B",
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
        lpTokenAddress: "0x8bc8FF0e1f679c5eE6E387468155336948185162",
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
        lpTokenAddress: "0x5D01a0169840049a9c799a15795dd3F3127c696E",
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
        lpTokenAddress: "0xcF21caD95135EB2C8bAC10DAf076A6479691A608",
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
        lpTokenAddress: "0xF6a38ed36db6fb6814981c353d6B8933e0dca925",
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
        lpTokenAddress: "0xd3aDc67e27B532CB05fB2f76dbdEaE7014087655",
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
        lpTokenAddress: "0xF1cD5D44FE82AC153e469E1385329007503B1Acd",
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
        lpTokenAddress: "0x105313EFc5Eb98C87709fF95F9E82369C02B56db",
        poolIdx: 38000,
    },
]

export const SDEX_LP_TOKEN_CONFIGS = {
    '0x0c576d': bobTestnetLpTokenConfigs, //bob testnet
    '0xed88': bobMainnetLpTokenConfigs, // @todo change to bobMainnetPoolConfigs for real token deployment
    '0xaa36a7' : sepoliaLpTokenConfigs,
}