
/* Workflow to deploy a basic SdexSwapDex contract using a pre-determined
 * create2 vanity salt, then hand off to the SdexPolicy contract. 
 *
 * Call using:
 * npx hardhat run 
 */

import { inflateAddr, initChain } from '../../libs/chain';
import hre from "hardhat"
//import { ethers } from "hardhat"

async function deploy() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())
    console.log(`Deploying SdexSwapDeployer Contract to chain ${chainId}...`)
    console.log("Initial Authority: ")

    let sdexDeployer = inflateAddr("SdexDeployer", addrs.deployer, authority, 
        authority.address)
    addrs.deployer = (await sdexDeployer).address

    console.log("SdexDeployer: ", addrs.deployer)
    console.log(`Updated addresses for ${chainId}`, addrs)
}

deploy()
