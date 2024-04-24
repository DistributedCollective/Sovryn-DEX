/* Installs the major sidecar proxy contracts to SdexSwapDex through SdexPolicy
 * calls. */

import { inflateAddr, initChain, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import { SdexPolicy, ERC20, TimelockAccepts } from '../../../typechain';
import { BOOT_PROXY_IDX, LP_PROXY_IDX, TOKEN_ADDRS } from '../../constants/addrs';
import { BigNumber, BytesLike, ethers } from 'ethers';
// import { MockERC20 } from '../../../contracts/typechain';
import { opsResolution, populateTimelockCalls } from '../../libs/governance';
import hre from "hardhat"

const abi = new AbiCoder()
let cmd

const txArgs = { gasLimit: 1000000 }

async function install() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, chainId, wallet: authority } = initChain(chainIdHex.toString())

    let policy = (await refContract("SdexPolicy", addrs.policy, authority)) as SdexPolicy
    await traceContractTx(policy.transferGovernance(addrs.govern.timelockOps, 
        addrs.govern.timelockTreasury, addrs.govern.timelockEmergency, txArgs),
        "Transfer SdexPolicy to Timelocks")
}

install()
