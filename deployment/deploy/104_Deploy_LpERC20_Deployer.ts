import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async ({
  deployments: { deploy, get },
  getNamedAccounts,
}) => {
  const { deployer } = await getNamedAccounts();

  await deploy("SdexLpTokenDeployer", {
    contract: "SdexLpTokenDeployer",
    from: deployer,
    args:[(await get("BeaconSdexLpErc20")).address],
    log: true,
  });
};

func.tags = ["SdexLpTokenDeployer"];

export default func;
