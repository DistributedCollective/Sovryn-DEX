import { solidity } from "ethereum-waffle";
import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { Signer } from "ethers";
import { SdexSwapDex } from "../typechain";
import { AbiCoder } from "@ethersproject/abi";

export const BOOT_PROXY_IDX = 0;
export const SWAP_PROXY_IDX = 1;
export const LP_PROXY_IDX = 128;
export const COLD_PROXY_IDX = 3;
export const LONG_PROXY_IDX =130;
export const MICRO_PROXY_IDX = 131;
export const KNOCKOUT_LP_PROXY_IDX = 7;
export const FLAG_CROSS_PROXY_IDX = 3500;
export const SAFE_MODE_PROXY_PATH = 9999;

export async function buildSdexSwapDex (auth: Promise<Signer>): Promise<SdexSwapDex> {
    const abi = new AbiCoder()

    let factory = await ethers.getContractFactory("SdexSwapDex")
    let dex = await factory.connect(await auth).deploy() as SdexSwapDex

    factory = await ethers.getContractFactory("SdexLpErc20");
    let lpTokenLogic = await factory.deploy();
    factory = await ethers.getContractFactory("SdexUpgradeableBeacon");
    let upgradeableBeacon = await factory.deploy(lpTokenLogic.address, ethers.constants.AddressZero);
    

    factory = await ethers.getContractFactory("ColdPath")
    let proxy = await factory.deploy()
    let cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, COLD_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)

    /** Set lp token deployer adddress */
    factory = await ethers.getContractFactory("SdexLpTokenDeployer")
    let lpTokenDeployer = await factory.deploy(upgradeableBeacon.address);
    let abiCoder = new ethers.utils.AbiCoder()
    let lpTokenBeaconCmd = abiCoder.encode(["uint8", "address"], [118, lpTokenDeployer.address]);
    await dex.protocolCmd(COLD_PROXY_IDX, lpTokenBeaconCmd, false)
    /** End Set lp token deployer adddress */

    factory = await ethers.getContractFactory("HotProxy")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, SWAP_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("WarmPath")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, LP_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("LongPath")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, LONG_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("MicroPaths")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, MICRO_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("KnockoutFlagPath")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, FLAG_CROSS_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("KnockoutLiqPath")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, KNOCKOUT_LP_PROXY_IDX])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    factory = await ethers.getContractFactory("SafeModePath")
    proxy = await factory.deploy()
    cmd = abi.encode(["uint8", "address", "uint16"], [21, proxy.address, SAFE_MODE_PROXY_PATH])
    await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true) 

    return dex
}
