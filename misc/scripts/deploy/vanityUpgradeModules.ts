/* Installs the major sidecar proxy contracts to SdexSwapDex through SdexPolicy
 * calls. */
import { ColdPath, SdexPolicy, SdexSwapDex } from '../../../typechain';
import { COLD_PROXY_IDX, BOOT_PROXY_IDX, FLAG_CROSS_PROXY_IDX, KNOCKOUT_LP_PROXY_IDX, LONG_PROXY_IDX, LP_PROXY_IDX, MICRO_PROXY_IDX, SWAP_PROXY_IDX, SAFE_MODE_PROXY_PATH } from '../../constants/addrs';
import { inflateAddr, initChain, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import hre from "hardhat"

const abi = new AbiCoder()
let cmd

const txArgs = { gasLimit: 1000000}

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

async function install() {
    const { ethers, deployments: { get } } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority, lpTokenConfigs } = initChain(chainIdHex.toString())

    let policy = (await inflateAddr("SdexPolicy", addrs.policy, authority)) as SdexPolicy

    // // Install cold path proxy
    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.cold, COLD_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install cold path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.long, LONG_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install long path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.warm, LP_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install warm path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.hot, SWAP_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install hot proxy path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.micro, MICRO_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install micro paths")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.knockout, KNOCKOUT_LP_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install knockout liquidity proxy path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.koCross, FLAG_CROSS_PROXY_IDX])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install knockout cross proxy path")

    // cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.safeMode, SAFE_MODE_PROXY_PATH])
    // await traceContractTx(policy.treasuryResolution(
    //     addrs.dex, BOOT_PROXY_IDX, cmd, true, txArgs), "Install Safe mode proxy path")


    // // register lp token
    // for(const lpTokenConfig of lpTokenConfigs) {
    //     let baseTokenAddress = lpTokenConfig.baseToken.tokenSymbol === "ETH" ? ethers.constants.AddressZero : (await get(lpTokenConfig.baseToken.tokenDeploymentName)).address;
    //     let quoteTokenAddress = lpTokenConfig.quoteToken.tokenSymbol === "ETH" ? ethers.constants.AddressZero : (await get(lpTokenConfig.quoteToken.tokenDeploymentName)).address;

    //     if(compareAddresses(baseTokenAddress, quoteTokenAddress) > 0) {
    //         [baseTokenAddress, quoteTokenAddress] = [quoteTokenAddress, baseTokenAddress];
    //     }

    //     cmd = abi.encode(["uint8", "address", "address", "uint256", "address"],
    //         [117, baseTokenAddress, quoteTokenAddress, lpTokenConfig.poolIdx, lpTokenConfig.lpTokenAddress])

    //     await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
    //         cmd, txArgs), `Register pool lp token for base ${lpTokenConfig.baseToken.tokenSymbol} - quote ${lpTokenConfig.quoteToken.tokenSymbol}`)
    // }

    // register lp token deployer contract address
    cmd = abi.encode(["uint8", "address"],
        [118, (await get("SdexLpTokenDeployer")).address])
    await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
        cmd, txArgs), "Register pool lp token deployer")
}

install()
