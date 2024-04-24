import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async ({
  deployments: { deploy },
  getNamedAccounts,
}) => {
  const { deployer } = await getNamedAccounts();

  // deploy SdexLpErc20 logic used by beacon

  await deploy("SdexLpErc20Logic", {
    contract: "SdexLpErc20",
    from: deployer,
    args:[],
    log: true,
  });
};

func.tags = ["SdexLpErc20"];

export default func;
