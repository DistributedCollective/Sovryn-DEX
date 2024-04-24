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
      tokenName: "MOCK_WBTC",
      tokenSymbol: "mWBTC",
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
      tokenName: "MOCK_tBTC",
      tokenSymbol: "mTBTC",
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
      tokenName: "MOCK_rETH",
      tokenSymbol: "mRETH",
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
      tokenName: "MOCK_USDT",
      tokenSymbol: "mUSDT",
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
      tokenName: "MOCK_DAI",
      tokenSymbol: "mDAI",
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
      tokenName: "MOCK_eSOV",
      tokenSymbol: "mESOV",
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
      tokenName: "MOCK_ALEX",
      tokenSymbol: "mALEX",
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
        tokenName: "MOCK_USDC",
        tokenSymbol: "mUSDC",
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
        tokenName: "MOCK_DLLR",
        tokenSymbol: "mDLLR",
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
        tokenName: "MOCK_POWA",
        tokenSymbol: "mPOWA",
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
        tokenName: "MOCK_WSTETH",
        tokenSymbol: "mWSTETH",
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

func.tags = ["MockTokens"];

export default func;
