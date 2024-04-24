import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async ({
  deployments: { deploy, get, log },
  getNamedAccounts, network
}) => {
  const { deployer } = await getNamedAccounts();
  const deployerSigner = ethers.provider.getSigner(deployer);

  const lpErc20Address = (await get("SdexLpErc20Logic")).address;
  const safeMultiSig = (await get("SafeMultiSig")).address;

  // contains SdexLpErc20 logic address
  const tx = await deploy("BeaconSdexLpErc20", {
    contract: "SdexUpgradeableBeacon",
    from: deployer,
    args: [lpErc20Address, network.tags.mainnet ? safeMultiSig : ethers.constants.AddressZero], // no ownership transfer if not on mainnet
    log: true,
  });

  if (!tx.newlyDeployed) {
     if(!network.tags.mainnet) {
       const beacon = await ethers.getContract("BeaconSdexLpErc20", deployerSigner);
       const beaconImpl = await beacon.implementation();
       if (beaconImpl != lpErc20Address) {
         log(`Replacing BeaconSdexLpErc20 implementation ${beaconImpl} with ${lpErc20Address}`)
         await beacon.upgradeTo(lpErc20Address);
       }
     } else {
       log("Create Safe tx to replace logic in Beacon");
     }
  }
};

func.tags = ["BeaconSdexLpErc20"];
func.dependencies = ["SdexLpErc20"];

export default func;
