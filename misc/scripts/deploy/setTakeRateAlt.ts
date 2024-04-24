
import { inflateAddr, initChain, initProvider, refContract, traceContractTx, traceTxResp } from '../../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import { ERC20, SdexPolicy, TimelockAccepts } from '../../../typechain';
import { BOOT_PROXY_IDX, COLD_PROXY_IDX, LP_PROXY_IDX, TOKEN_ADDRS } from '../../constants/addrs';
import { BigNumber, BytesLike, ethers } from 'ethers';
// import { MockERC20 } from '../../../contracts/typechain';
import { INIT_TIMELOCK_DELAY, opsResolution, populateTimelockCalls, treasuryResolution } from '../../libs/governance';
import { initLiqCmd, poolStdTemplCmd } from '../../libs/pool';
import hre from "hardhat"

const abi = new AbiCoder()

const txArgs = { gasLimit: 1000000}

// Used for testnet setups where governance isn't being put behind a timelock/multisig
async function install() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, wallet: authority } = initChain(chainIdHex.toString())

    // Take rate is in 1/256, so this is equivlent to 25% take rate
    const rate = 0;
    let policy = (await inflateAddr("SdexPolicy", addrs.policy, authority)) as SdexPolicy

    /** Set relayer TAKE RATE */
    let abiCoder = new ethers.utils.AbiCoder()
    let cmd = abiCoder.encode(["uint8", "uint8"], [116, rate])
    await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
        cmd, txArgs), "Set Relayer TAKE RATE")

    /** Set Normal TAKE RATE  */
    cmd = abiCoder.encode(["uint8", "uint8"], [114, rate])
    await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
        cmd, txArgs), "Set Normal TAKE RATE")

    /** Resync if needed */
    // cmd = abiCoder.encode(["uint8", "address", "address", "uint256"], [115, ethers.constants.AddressZero, "0xebE5E8866db71286242af5fbF64e9464596a40F2", poolParams.stdPoolIdx])
    // await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
    //     cmd, txArgs), "Resync TAKE RATE on pool")
    
    
}

install()
