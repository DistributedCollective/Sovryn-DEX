/* Creates the sidecar proxy contracts and periphery contracts. */

import { inflateAddr, initChain } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import hre from "hardhat"

const abi = new AbiCoder()
const depArgs = {gasLimit: 10000000, maxFeePerGas: 150_000_000n, maxPriorityFeePerGas: 110_000_000n}

async function install() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())

    addrs.cold = (await inflateAddr("ColdPath", addrs.cold, authority, depArgs)).address
    //console.log(addrs)

    addrs.hot = (await inflateAddr("HotProxy", addrs.hot, authority, depArgs)).address
    //console.log(addrs)

    addrs.knockout = (await inflateAddr("KnockoutLiqPath", addrs.knockout, authority, depArgs)).address
    //console.log(addrs)

    addrs.koCross = (await inflateAddr("KnockoutFlagPath", addrs.koCross, authority, depArgs)).address
    //console.log(addrs)

    addrs.long = (await inflateAddr("LongPath", addrs.long, authority, depArgs)).address
    //console.log(addrs)

    addrs.micro = (await inflateAddr("MicroPaths", addrs.micro, authority, depArgs)).address
    //console.log(addrs)

    addrs.warm = (await inflateAddr("WarmPath", addrs.warm, authority, depArgs)).address
    //console.log(addrs)

    addrs.policy = (await inflateAddr("SdexPolicy", addrs.policy, authority, addrs.dex, depArgs)).address
    //console.log(addrs)

    addrs.query = (await inflateAddr("SdexQuery", addrs.query, authority, addrs.dex, depArgs)).address
    //console.log(addrs)

    addrs.impact = (await inflateAddr("SdexImpact", addrs.impact, authority, addrs.dex, depArgs)).address
    //console.log(addrs)

    addrs.swapRouter = (await inflateAddr("SdexSwapRouter", addrs.swapRouter || "", authority, addrs.dex, depArgs)).address
    //console.log(addrs)

    addrs.swapBypass = (await inflateAddr("SdexSwapRouterBypass", addrs.swapBypass || "", authority, addrs.dex, depArgs)).address
    //console.log(addrs)

    addrs.safeMode = (await inflateAddr("SafeModePath", addrs.safeMode || "", authority, depArgs)).address
    //console.log(addrs)

    console.log(addrs)
}

install()
