/* Workflow to deploy a basic SdexSwapDex contract using a pre-determined
 * create2 vanity salt, then hand off to the SdexPolicy contract. 
 *
 * Call using:
 * npx hardhat run 
 */

import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { ColdPath, SdexDeployer, SdexPolicy, SdexSwapDex } from '../../../typechain';
import { mapSalt } from '../../constants/salts';
import { SDEX_ADDRS } from '../../constants/addrs';
import { initChain, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { RPC_URLS } from '../../constants/rpcs';

async function vanityDeploy() {
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())
    
    const salt = mapSalt(addrs.deployer)

    console.log("Deploying with the following addresses...")
    console.log("Protocol Authority: ", authority.address)
    console.log("Using CREATE2 salt", salt.toString())

    let sdexDeployer = await refContract("SdexDeployer", addrs.deployer, 
        authority) as SdexDeployer

    const factory = await ethers.getContractFactory("SdexSwapDex")
    console.log(await sdexDeployer.callStatic.deploy(factory.bytecode, salt))

    await traceContractTx(sdexDeployer.deploy(factory.bytecode, salt, { gasLimit: BigNumber.from(10000000), maxFeePerGas: 150_000_000n, maxPriorityFeePerGas: 150_000_000n }), "Salted Deploy")
    addrs.dex = await sdexDeployer.dex_();

    console.log("SdexSwapDex deployed at: ", addrs.dex)
    console.log(`Updated addresses for ${chainId}`, addrs)
}

vanityDeploy()
