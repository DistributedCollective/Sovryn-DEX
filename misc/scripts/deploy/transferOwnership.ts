
import { inflateAddr, initChain, initProvider } from '../../libs/chain';
import { SdexPolicy } from '../../../typechain';
import hre from "hardhat"

// Used for testnet setups where governance isn't being put behind a timelock/multisig
async function install() {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs, wallet: authority } = initChain(chainIdHex.toString())

    let policy = (await inflateAddr("SdexPolicy", addrs.policy, authority)) as SdexPolicy
    /** @todo change the addresses to multisig */
    const opsAddress = "0x04FB154FD8f611D2737A5ca4996Fb654CeAf2EBF";
    const treasuryAddress = "0x04FB154FD8f611D2737A5ca4996Fb654CeAf2EBF";
    const emergencyAddress = "0x04FB154FD8f611D2737A5ca4996Fb654CeAf2EBF";

    console.log("===== Transferring auths of policy =====")
    console.log(`old opsAddress: ${await policy.opsAuthority_()}`)
    console.log(`old treasuryAddress: ${await policy.treasuryAuthority_()}`)
    console.log(`old emergencyAddress: ${await policy.emergencyAuthority_()}`)

    console.log(`new opsAddress: ${opsAddress}`)
    console.log(`new treasuryAddress: ${treasuryAddress}`)
    console.log(`new emergencyAddress: ${emergencyAddress}`)
    await policy.transferOwnership(opsAddress, treasuryAddress, emergencyAddress);

    console.log(`transferred opsAuth to: ${await policy.opsAuthority_()}`)
    console.log(`transferred treasuryAuth to: ${await policy.treasuryAuthority_()}`)
    console.log(`transferred emergencyAuth to: ${await policy.emergencyAuthority_()}`)
}

install()
