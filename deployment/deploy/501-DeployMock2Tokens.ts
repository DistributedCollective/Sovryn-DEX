import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

interface IToken {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  initialMintRecipient: string[];
}

const func: DeployFunction = async ({
  deployments: { deploy, get },
  getNamedAccounts,
}) => {
  const { deployer } = await getNamedAccounts();

  const tokens: IToken[] = [
    {
      tokenName: "MOCK2_WBTC",
      tokenSymbol: "m2WBTC",
      tokenDecimal: 8,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_tBTC",
      tokenSymbol: "m2TBTC",
      tokenDecimal: 18,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_rETH",
      tokenSymbol: "m2RETH",
      tokenDecimal: 18,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_USDT",
      tokenSymbol: "m2USDT",
      tokenDecimal: 6,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_DAI",
      tokenSymbol: "m2DAI",
      tokenDecimal: 18,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_eSOV",
      tokenSymbol: "m2ESOV",
      tokenDecimal: 18,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
      tokenName: "MOCK2_ALEX",
      tokenSymbol: "m2ALEX",
      tokenDecimal: 18,
      initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
      ]
    },
    {
        tokenName: "MOCK2_USDC",
        tokenSymbol: "m2USDC",
        tokenDecimal: 6,
        initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
        ]
    },
    {
        tokenName: "MOCK2_DLLR",
        tokenSymbol: "m2DLLR",
        tokenDecimal: 18,
        initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
        ]
    },
    {
        tokenName: "MOCK2_POWA",
        tokenSymbol: "m2POWA",
        tokenDecimal: 18,
        initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
        ]
    },
    {
        tokenName: "MOCK2_WSTETH",
        tokenSymbol: "m2WSTETH",
        tokenDecimal: 18,
        initialMintRecipient: [
        "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF",
        "0xa6FC43e75AC6a825026907dC077d87BBDE02C7F5",
        "0xaaa5a190ACCbc50F4F9c130b5876521E4D5F9D6c",
        "0x2bD2201BFE156A71EB0D02837172ffc237218505",
        "0xaDbEE234896B1A53a80D113A7eceF5f2B4AeAED6",
        ]
    },
  ]

  for(const token of tokens) {
    await deploy(token.tokenName, {
      contract: "MockToken",
      from: deployer,
      args:[token.tokenName, token.tokenSymbol, token.tokenDecimal],
      log: true,
    });

    /** Mint right away */
    for(const mintRecipient of token.initialMintRecipient) {
        console.log(`Minting token ${token.tokenName} to ${mintRecipient}...`)
        const mintAmount = '1000000000000000000000000';
        const tokenContract = await ethers.getContract(token.tokenName, deployer)
        const tx = await tokenContract.mint(mintRecipient, mintAmount)
        await tx.wait()
    }
  }
};

func.tags = ["Mock2Tokens"];

export default func;
