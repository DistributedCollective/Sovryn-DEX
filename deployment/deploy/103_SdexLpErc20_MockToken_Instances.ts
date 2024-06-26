import { DeployFunction } from "hardhat-deploy/types";
import { SdexLpErc20 } from "../../typechain";
import { Contract } from "ethers";
import { POOL_IDXS } from "../../misc/constants/addrs";

function compareAddresses(address1: string, address2: string) {
  // Remove '0x' prefix if present
  address1 = address1.toLowerCase().replace(/^0x/i, '');
  address2 = address2.toLowerCase().replace(/^0x/i, '');

  // Pad addresses with zeros to make them equal length
  const maxLength = Math.max(address1.length, address2.length);
  address1 = address1.padStart(maxLength, '0');
  address2 = address2.padStart(maxLength, '0');

  // Compare addresses numerically
  for (let i = 0; i < maxLength; i++) {
      const char1 = parseInt(address1[i], 16);
      const char2 = parseInt(address2[i], 16);
      
      if (char1 > char2) {
          return 1;
      } else if (char1 < char2) {
          return -1;
      }
  }
  
  // If all characters are equal
  return 0;
}

const func: DeployFunction = async ({
  deployments: { deploy, get, save: saveDeployment, log },
  ethers,
  network,
  getNamedAccounts,
}) => {
  const { deployer } = await getNamedAccounts();
  const beacon = await get("BeaconSdexLpErc20");
  const logicDeployment = await get("SdexLpErc20Logic");
  const logicDeploymentAbi = new ethers.utils.Interface(logicDeployment.abi);

  // Deploys LP ERC tokens using upgradeable beacon pattern for each pair
  // poolIdx - pool template id
  // adjust the pairs list list as needed

  // @todo add tokens external deployments
  const ETH = ethers.constants.AddressZero;
  const wBTC = (await get("MOCK_WBTC")).address;
  const tBTC = (await get("MOCK_tBTC")).address;
  const  rETH = (await get("MOCK_rETH")).address;
  const  wstETH = (await get("MOCK_WSTETH")).address;
  const  USDT = (await get("MOCK_USDT")).address;
  const  USDC = (await get("MOCK_USDC")).address;
  const DAI = (await get("MOCK_DAI")).address;
  const SOV = (await get("MOCK_SOV")).address;
  const DLLR = (await get("MOCK_DLLR")).address;
  const POWA = (await get("MOCK_POWA")).address;
  const sdex = (await get("SdexSwapDex")).address;
  const poolIdx01 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["01"].toString();
  const poolIdx035 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["035"].toString();
  const poolIdx05 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["05"].toString();
  
  //@todo set poolIdx - pool template id per pair if needed
  let sdexLpErc20PairsData = [
    // Stable Pairs
    { base: USDC, quote: USDT, poolIdx: poolIdx01 },
    { base: DAI, quote: DLLR, poolIdx: poolIdx01 },
    { base: USDT, quote: DLLR, poolIdx: poolIdx01 },
    { base: tBTC, quote: wBTC, poolIdx: poolIdx01 },
    { base: rETH, quote: ETH, poolIdx: poolIdx01 },
    { base: wstETH, quote: ETH, poolIdx: poolIdx01 },

    // SOV Pairs
    { base: DLLR, quote: SOV, poolIdx: poolIdx01 },
    { base: USDT, quote: SOV, poolIdx: poolIdx035 },
    { base: USDC, quote: SOV, poolIdx: poolIdx035 },
    { base: DAI, quote: SOV, poolIdx: poolIdx035 },
    { base: ETH, quote: SOV, poolIdx: poolIdx035 },
    { base: wstETH, quote: SOV, poolIdx: poolIdx035 },
    { base: rETH, quote: SOV, poolIdx: poolIdx035 },
    { base: wBTC, quote: SOV, poolIdx: poolIdx035 },
    { base: tBTC, quote: SOV, poolIdx: poolIdx035 },
    { base: POWA, quote: SOV, poolIdx: poolIdx05 },


  ].map(
    ({ base, quote, poolIdx }) => {
      if (compareAddresses(base, quote) > 0) {
        quote = [base, base = quote][0];
      }
      const encodedData = logicDeploymentAbi.encodeFunctionData(
        "initialize",
        [
          base,
          quote,
          poolIdx,
          sdex
        ]
      );
      
      return {
        base: base,
        quote: quote,
        poolIdx: poolIdx,
        data: encodedData
      };
  })

  for (const item of sdexLpErc20PairsData) {
    const beaconProxyName = "SdexLpErc20BeaconProxy_" + item.base + "-" + item.quote + "-" + item.poolIdx;
    const deploymentInstanceName = "SdexLpErc20_" + item.base + "-" + item.quote + "-" + item.poolIdx;
    const deployResult = await deploy(beaconProxyName, {
      contract: "SdexBeaconProxy",
      from: deployer,
      args: [beacon.address, item.data],
      log: true,
    });
    log(`Saving LP ERC20 token deployment ${deploymentInstanceName} ${logicDeployment.address} @ ${deployResult.address}`);
    await saveDeployment(deploymentInstanceName, {
            address: deployResult.address,
            implementation: logicDeployment.address,
            abi: logicDeployment.abi,
            bytecode: logicDeployment.bytecode,
            deployedBytecode: logicDeployment.deployedBytecode,
            devdoc: logicDeployment.devdoc,
            userdoc: logicDeployment.userdoc,
            storageLayout: logicDeployment.storageLayout,
        });
  }
};

func.tags = ["LpMockErc20TokenInstances"];
func.dependencies = ["BeaconSdexLpErc20"]

export default func;
