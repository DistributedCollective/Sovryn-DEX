
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
    const opsAddress = "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF";
    const treasuryAddress = "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF";
    const emergencyAddress = "0xCF311E7375083b9513566a47B9f3e93F1FcdCfBF";

    console.log("===== Transferring auths of policy =====")
    console.log(`old opsAddress: ${await policy.opsAuthority_()}`)
    console.log(`old treasuryAddress: ${await policy.treasuryAuthority_()}`)
    console.log(`old emergencyAddress: ${await policy.emergencyAuthority_()}`)

    console.log(`new opsAddress: ${opsAddress}`)
    console.log(`new treasuryAddress: ${opsAddress}`)
    console.log(`new emergencyAddress: ${opsAddress}`)
    await policy.transferOwnership(opsAddress, treasuryAddress, emergencyAddress);
}

install()
