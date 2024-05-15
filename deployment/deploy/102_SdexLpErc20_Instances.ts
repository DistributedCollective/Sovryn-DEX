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
  const wBTC = (await get("wBTC")).address;
  const tBTC = (await get("tBTC")).address;
  const  rETH = (await get("rETH")).address;
  const  wstETH = (await get("wstETH")).address;
  const  USDT = (await get("USDT")).address;
  const  USDC = (await get("USDC")).address;
  const DAI = (await get("DAI")).address;
  const SOV = (await get("SOV")).address;
  const DLLR = (await get("DLLR")).address;
  const POWA = (await get("POWA")).address;
  const sdex = (await get("SdexSwapDex")).address;
  const poolIdx01 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["01"].toString();
  const poolIdx035 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["035"].toString();
  const poolIdx05 = POOL_IDXS[ethers.utils.hexlify(network.config.chainId!)]["05"].toString();
  
  //@todo set poolIdx - pool template id per pair if needed
  let sdexLpErc20PairsData = [
    { base: USDT, quote: SOV, baseSymbol: "USDT", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: USDC, quote: SOV, baseSymbol: "USDC", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: wBTC, quote: SOV, baseSymbol: "wBTC", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: tBTC, quote: SOV, baseSymbol: "tBTC", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: ETH, quote: SOV, baseSymbol: "ETH", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: wstETH, quote: SOV, baseSymbol: "wstETH", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: rETH, quote: SOV, baseSymbol: "rETH", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: DAI, quote: SOV, baseSymbol: "DAI", quoteSymbol: "SOV", poolIdx: poolIdx035 },
    { base: DLLR, quote: SOV, baseSymbol: "DLLR", quoteSymbol: "SOV", poolIdx: poolIdx01 },
    { base: USDC, quote: USDT, baseSymbol: "USDC", quoteSymbol: "USDT", poolIdx: poolIdx01 },
    { base: USDT, quote: DLLR, baseSymbol: "USDT", quoteSymbol: "DLLR", poolIdx: poolIdx01 },
    { base: tBTC, quote: wBTC, baseSymbol: "tBTC", quoteSymbol: "wBTC", poolIdx: poolIdx01 },
    { base: POWA, quote: SOV, baseSymbol: "POWA", quoteSymbol: "SOV", poolIdx: poolIdx05 },
  ].map(
    ({ base, quote, baseSymbol, quoteSymbol,poolIdx }) => {
      if (compareAddresses(base, quote) > 0) {
        [quote, base] = [base, quote];
        [quoteSymbol, baseSymbol] = [baseSymbol, quoteSymbol];
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
        baseSymbol,
        quoteSymbol,
        base,
        quote,
        poolIdx,
        data: encodedData
      };
  })

  for (const item of sdexLpErc20PairsData) {
    const beaconProxyName = "SdexLpErc20BeaconProxy_" + item.baseSymbol.toUpperCase() + "-" + item.quoteSymbol.toUpperCase() + "-" + item.poolIdx;
    const deploymentInstanceName = "SdexLpErc20_" + item.baseSymbol.toUpperCase() + "-" + item.quoteSymbol.toUpperCase() + "-" + item.poolIdx;
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

func.tags = ["LpErc20TokenInstances"];
//func.dependencies = ["BeaconSdexLpErc20"]

export default func;
