import { initProvider, refContract } from '../libs/chain';
import { decodePolicySched, treasuryResolution, SdexProtocolCmd } from '../libs/governance';
import { SdexSwapDex, TimelockAccepts } from '../../typechain';
import { SdexPolicy } from '../../typechain';
import { AbiCoder } from '@ethersproject/abi';

async function decode (calldata: string) {
    let { addrs } = initProvider()
    const abi = new AbiCoder()

    let timelock = refContract("TimelockAccepts", addrs.govern.timelockOps) as Promise<TimelockAccepts>
    let policy = refContract("SdexPolicy", addrs.policy) as Promise<SdexPolicy>
    let dex = refContract("SdexSwapDex", addrs.dex) as Promise<SdexSwapDex>

    decodePolicySched(await timelock, await policy, await dex, calldata)
}

const calldata = process.env.CMD_CALLDATA
if (!calldata) {
    throw new Error("Set CMD_CALLDATA env var")
}
decode(calldata)
