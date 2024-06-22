/* Workflow to transfer control of the newly deployed SdexSwapDex contract away
 * from the SdexDeployer to a SdexPolicy contract under the control of the authority
 * wallet. (Also installs ColdPath as necessary part of the workflow)
 */

import { ColdPath, SdexDeployer, SdexPolicy, SdexSwapDex } from '../../../typechain';
import { BOOT_PROXY_IDX, COLD_PROXY_IDX } from '../../constants/addrs';
import { inflateAddr, initChain, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import hre from "hardhat"

const abi = new AbiCoder()
const depArgs = {maxFeePerGas: 150_000_000n, maxPriorityFeePerGas: 150_000_000n}

async function vanityDeploy() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())

    const sdexDeployer = await refContract("SdexDeployer", addrs.deployer, 
        authority) as SdexDeployer

    const coldPath = await inflateAddr("ColdPath", addrs.cold, authority, depArgs) as ColdPath
    addrs.cold = coldPath.address

    const policy = await inflateAddr("SdexPolicy", addrs.policy, 
        authority, addrs.dex, depArgs) as SdexPolicy
    addrs.policy = policy.address

    console.log(`Updated addresses for ${chainId}`, addrs)

    let cmd;

    // Install cold path proxy, so we can transfer ownership
    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.cold, COLD_PROXY_IDX])
    await traceContractTx(sdexDeployer.protocolCmd(addrs.dex, BOOT_PROXY_IDX, cmd, true, {"gasLimit": 1000000, maxFeePerGas: 150_000_000n, maxPriorityFeePerGas: 150_000_000n}), 
        "Cold Path Install")

    cmd = abi.encode(["uint8", "address"], [20, policy.address])
    await traceContractTx(sdexDeployer.protocolCmd(addrs.dex, COLD_PROXY_IDX, cmd, true, {"gasLimit": 1000000, maxFeePerGas: 150_000_000n, maxPriorityFeePerGas: 150_000_000n}), 
        "Transfer to Policy Contract")

    console.log(`Updated addresses for ${chainId}`, addrs)
}

vanityDeploy()
