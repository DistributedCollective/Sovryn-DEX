/* Creates the sidecar proxy contracts and periphery contracts. */

import { inflateAddr, initChain } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import hre from "hardhat"

const abi = new AbiCoder()

async function install() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())

    addrs.cold = (await inflateAddr("ColdPath", addrs.cold, authority)).address
    //console.log(addrs)

    addrs.hot = (await inflateAddr("HotProxy", addrs.hot, authority)).address
    //console.log(addrs)

    addrs.knockout = (await inflateAddr("KnockoutLiqPath", addrs.knockout, authority)).address
    //console.log(addrs)

    addrs.koCross = (await inflateAddr("KnockoutFlagPath", addrs.koCross, authority)).address
    //console.log(addrs)

    addrs.long = (await inflateAddr("LongPath", addrs.long, authority)).address
    //console.log(addrs)

    addrs.micro = (await inflateAddr("MicroPaths", addrs.micro, authority)).address
    //console.log(addrs)

    addrs.warm = (await inflateAddr("WarmPath", addrs.warm, authority)).address
    //console.log(addrs)

    addrs.policy = (await inflateAddr("SdexPolicy", addrs.policy, authority, addrs.dex)).address
    //console.log(addrs)

    addrs.query = (await inflateAddr("SdexQuery", addrs.query, authority, addrs.dex)).address
    //console.log(addrs)

    addrs.impact = (await inflateAddr("SdexImpact", addrs.impact, authority, addrs.dex)).address
    //console.log(addrs)

    addrs.swapRouter = (await inflateAddr("SdexSwapRouter", addrs.swapRouter || "", authority, addrs.dex)).address
    //console.log(addrs)

    addrs.swapBypass = (await inflateAddr("SdexSwapRouterBypass", addrs.swapBypass || "", authority, addrs.dex)).address
    //console.log(addrs)

    addrs.safeMode = (await inflateAddr("SafeModePath", addrs.safeMode || "", authority)).address
    //console.log(addrs)

    console.log(addrs)
}

install()
