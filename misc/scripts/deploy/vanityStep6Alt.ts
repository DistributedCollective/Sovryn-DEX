
import { inflateAddr, initChain, initProvider, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import { SdexPolicy, ERC20, TimelockAccepts } from '../../../typechain';
import { initLiqCmd, poolStdTemplCmd } from '../../libs/pool';
import hre from "hardhat"

const abi = new AbiCoder()

const txArgs = { gasLimit: 1000000}

// Used for testnet setups where governance isn't being put behind a timelock/multisig
async function install() {
    const { ethers } = hre;
    const chainIdHexStr = (ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)).toString()
    let { addrs, poolParams, } = initProvider(chainIdHexStr)
    let { wallet: authority } = initChain(chainIdHexStr)
    
    let policy = (await inflateAddr("SdexPolicy", addrs.policy, authority)) as SdexPolicy

    let initCmd = initLiqCmd(poolParams)
    await traceContractTx(policy.opsResolution(addrs.dex, initCmd.callpath, 
        initCmd.protocolCmd, txArgs), "Set pool init liquidity")

    let templCmd = poolStdTemplCmd(poolParams)
    await traceContractTx(policy.opsResolution(addrs.dex, templCmd.callpath, 
        templCmd.protocolCmd, txArgs), "Set pool template")
}

install()
