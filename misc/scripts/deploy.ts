
import { SdexSwapDexSeed } from '../../typechain/SdexSwapDexSeed';
import { ethers } from 'hardhat';
import { ContractFactory, BytesLike, BigNumber, Signer } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { toSqrtPrice, fromSqrtPrice, MIN_PRICE, MAX_PRICE, MIN_TICK, ZERO_ADDR } from '../../test/FixedPoint';
import { MockERC20 } from '../../typechain/MockERC20';
import { QueryHelper } from '../../typechain/QueryHelper';
import { SdexSwapDex } from '../../typechain/SdexSwapDex';
import { IERC20Minimal } from '../../typechain/IERC20Minimal';
import { ColdPath } from '../../typechain/ColdPath';
import { AddressZero } from '@ethersproject/constants';
import { WarmPath } from '../../typechain/WarmPath';
import { LongPath } from '../../typechain/LongPath';
import { MicroPaths } from '../../typechain/MicroPaths';
import { SdexPolicy } from '../../typechain/SdexPolicy';
import { SdexQuery } from '../../typechain/SdexQuery';
import { SdexShell } from '../../typechain/SdexShell';
import { HotPath } from '../../typechain/HotPath';
import { BootPath, SdexImpact, KnockoutFlagPath, KnockoutLiqPath } from '../../typechain';

interface SdexAddrs {
    dex: string | undefined,
    cold: string | undefined,
    warm: string | undefined,
    long: string | undefined,
    micro: string | undefined,
    hot: string | undefined,
    knockout: string | undefined,
    koCross: string | undefined,
    policy: string | undefined,
    query: string | undefined,
    impact: string | undefined,
    shell: string | undefined
  }

// Bob on Sepolia testnet
//    let addrs: SdexAddrs = {
//         dex: '',
//         cold: '',
//         warm: '',
//         long: '',
//         micro: '',
//         hot: '',
//         knockout: '',
//         koCross: '',
//         policy: '',
//         query: '',
//         impact: '',
//         shell: '',
//     }

// Bob mainnet (L2 on ethereum)
//    let addrs: SdexAddrs = {
//         dex: '',
//         cold: '',
//         warm: '',
//         long: '',
//         micro: '',
//         hot: '',
//         knockout: '',
//         koCross: '',
//         policy: '',
//         query: '',
//         impact: '',
//         shell: '',
//     }

// Tenderly virtual network
let addrs: SdexAddrs = {
    dex: '0xDFDC89c04EE7E661Fdbfd50972923823350d8514',
    cold: '0x6138a1c3c2a419075E50f2C8A8600366D4105f8d',
    warm: '0xa98320ac64923049f1b56c943656f30026402c64',
    long: '0xdC3e5232db60088D67aA7AF10595979D7eB5290f',
    micro: '0x67bF6DE7f8d4d13FBa410CBe05219cB26242A7C9',
    hot: '0xe888470E4b7e077115edbBeC883CCD7C609AeE3c',
    knockout: '0x46f6999854FF922187Ed71fa72dA16Eff436607b',
    koCross: '0x0c5b9385Cc9fa96bc26A0Ab066ac3047A8f0FFa3',
    policy: '0x87837702E1d4682d98F466Bd78F21da125a2c58A',
    query: '0x7B794a3101594EC9aF48eF505E9f18DFbe966315',
    impact: '0x3beb724c3c2b8ae0DfCe74015B21f6cf962D9881',
    shell: '',
}

// Bob Testnet
// let tokens = {
//     eth: ZERO_ADDR,
//     dai: "0x0D7423380F4b6f96D8188CCCfB086aBEC84A0934",
//     usdt: "0xfCDaC6196C22908ddA4CE84fb595B1C7986346bF",
//     usdc: "0xEf6495e4D07Fa58e473C5CC3a2e3ebB8876CC798",
//     sov: "0x3E610F32806e09C2Ba65b8c88A6E4f777c8Cb559",
// }

// Tenderly Virtual Network
// let tokens = {
//     eth: ZERO_ADDR,
//     dai: "",
//     usdt: "",
//     usdc: "",
//     sov: "",
// }

const POOL_IDX = 36000

const BOOT_PROXY_IDX = 0;
const SWAP_PROXY_IDX = 1;
const LP_PROXY_IDX = 2;
const COLD_PROXY_IDX = 3;
const LONG_PROXY_IDX = 4;
const MICRO_PROXY_IDX = 5;
const MULTICALL_PROXY_IDX = 6;
const KNOCKOUT_LP_PROXY_IDX = 7;
const FLAG_CROSS_PROXY_IDX = 3500;
const SAFE_MODE_PROXY_PATH = 9999;

let abi = new ethers.utils.AbiCoder()
const override = { gasLimit: 6000000 }

async function createDexContracts(): Promise<SdexSwapDex> {
    let factory

    factory = await ethers.getContractFactory("WarmPath")
    let warmPath = addrs.warm ? factory.attach(addrs.warm) :
        await factory.deploy(override) as WarmPath
    addrs.warm = warmPath.address
        
    factory = await ethers.getContractFactory("LongPath")
    let longPath = addrs.long ? factory.attach(addrs.long) :
        await factory.deploy(override) as LongPath
    addrs.long = longPath.address
    
    factory = await ethers.getContractFactory("MicroPaths")
    let microPath = addrs.micro ? factory.attach(addrs.micro) :
        await factory.deploy(override) as MicroPaths
    addrs.micro = microPath.address

    factory = await ethers.getContractFactory("ColdPath")
    let coldPath = addrs.cold ? factory.attach(addrs.cold) :
        await factory.deploy(override) as ColdPath
    addrs.cold = coldPath.address

    factory = await ethers.getContractFactory("HotProxy")
    let hotPath = addrs.hot ? factory.attach(addrs.hot) :
        await factory.deploy(override) as HotPath
    addrs.hot = hotPath.address

    factory = await ethers.getContractFactory("KnockoutLiqPath")
    let knockoutPath = addrs.knockout ? factory.attach(addrs.knockout) :
        await factory.deploy(override) as KnockoutLiqPath    
    addrs.knockout = knockoutPath.address

    factory = await ethers.getContractFactory("KnockoutFlagPath")
    let crossPath = addrs.koCross ? factory.attach(addrs.koCross) :
        await factory.deploy(override) as KnockoutFlagPath    
    addrs.koCross = crossPath.address
        
    factory = await ethers.getContractFactory("SdexSwapDex")
    let dex = (addrs.dex ? factory.attach(addrs.dex) :
        await factory.deploy(override)) as SdexSwapDex
    console.log("asd")
    console.log(dex.address);
    addrs.dex = dex.address

    console.log(addrs)
    return dex
}

async function createPeripheryContracts (dexAddr: string): Promise<SdexPolicy> {
    let factory;

    factory = await ethers.getContractFactory("SdexPolicy")
    let policy = (addrs.policy ? factory.attach(addrs.policy) :
        await factory.deploy(dexAddr)) as SdexPolicy
    addrs.policy = policy.address

    factory = await ethers.getContractFactory("SdexQuery")
    let query = (addrs.query ? factory.attach(addrs.query) :
        await factory.deploy(dexAddr, override)) as SdexQuery
    addrs.query = query.address

    factory = await ethers.getContractFactory("SdexImpact")
    let impact = (addrs.impact ? factory.attach(addrs.impact) :
        await factory.deploy(dexAddr, override)) as SdexImpact
    addrs.impact = impact.address
        
    factory = await ethers.getContractFactory("SdexShell")
    let shell = (addrs.shell ? factory.attach(addrs.shell) :
        await factory.deploy(override)) as SdexShell
    addrs.shell = shell.address

    console.log(addrs)
    return policy 
}

async function installPolicy (dex: SdexSwapDex) {
    let authCmd = abi.encode(["uint8", "address"], [20, addrs.policy])
    let tx = await dex.protocolCmd(COLD_PROXY_IDX, authCmd, true, override);
    await tx.wait()
}

async function installSidecars (dex: SdexSwapDex) {

    let abi = new ethers.utils.AbiCoder()
    let tx
    let cmd;

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.cold, COLD_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.warm, LP_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.hot, SWAP_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.long, LONG_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.micro, MICRO_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.knockout, KNOCKOUT_LP_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx

    cmd = abi.encode(["uint8", "address", "uint16"], [21, addrs.koCross, FLAG_CROSS_PROXY_IDX])
    tx = await dex.protocolCmd(BOOT_PROXY_IDX, cmd, true)
    await tx
}

async function initPoolTemplate (policy: SdexPolicy) {
    const POOL_INIT_LIQ = 10000
    const FEE_BPS = 28
    const TICK_SIZE = 16
    const JIT_THRESH = 3

    const KNOCKOUT_ON_FLAG = 32
    const KNOCKOUT_TICKS_FLAG = 4 // 16 ticks
    const knockoutFlag = KNOCKOUT_ON_FLAG + KNOCKOUT_TICKS_FLAG

    if (addrs.dex) { 
        let setPoolLiqCmd = abi.encode(["uint8", "uint128"], [112, POOL_INIT_LIQ])
        let tx = await policy.treasuryResolution(addrs.dex, COLD_PROXY_IDX, setPoolLiqCmd, false, override)
        await tx.wait()

        let templateCmd = abi.encode(["uint8", "uint256", "uint16", "uint16", "uint8", "uint8", "uint8"],
            [110, POOL_IDX, FEE_BPS * 100, TICK_SIZE, JIT_THRESH, knockoutFlag, 0])
        tx = await policy.opsResolution(addrs.dex, COLD_PROXY_IDX, templateCmd, override)
        await tx.wait()
    }
}

async function deploy() {
    // let authority = (await ethers.getSigners())[0]

    // console.log("Deploying with the following addresses...")
    // console.log("Protocol Authority: ", await authority.address)

    let dex = await createDexContracts()
    // let policy = await createPeripheryContracts(dex.address)
  
    // /*await installSidecars(dex)
    // await installPolicy(dex)*/

    // await initPoolTemplate(policy)
  
    /*factory = await ethers.getContractFactory("MockERC20")
    let dai = factory.attach(tokens.dai) as MockERC20
    let usdc = factory.attach(tokens.usdc) as MockERC20*/

    /*tx = await dai.approve(dex.address, BigNumber.from(10).pow(36))
    await tx.wait()

    tx = await usdc.approve(dex.address, BigNumber.from(10).pow(36))
    await tx.wait()*/

    /*console.log("Q") */
    let initPoolCmd = abi.encode(["uint8", "address", "address", "uint256", "uint128"],
        [71, tokens.eth, tokens.sov, 36000, toSqrtPrice(1/1607)])
    const tx = await dex.userCmd(3, initPoolCmd, { value: BigNumber.from(10).pow(12), gasLimit: 9000000})
    console.log(tx)
    await tx.wait()

    // let initUsdcCmd = abi.encode(["uint8", "address", "address", "uint256", "uint128"],
    //     [71, tokens.usdc, tokens.dai, 36000, toSqrtPrice(Math.pow(10, -12))])
    // tx = await dex.userCmd(0, initUsdcCmd, { gasLimit: 6000000})
    // console.log(tx)
    // await tx.wait()*/

    // let mintCmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
    //     [31, tokens.eth, tokens.sov, 36000, 0, 0, BigNumber.from(10).pow(16), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    // const tx = await dex.userCmd(128, mintCmd, { value: BigNumber.from(10).pow(16), gasLimit: 6000000})
    // console.log(tx)
    // await tx.wait()

    /*cmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
        [31, tokens.usdc, tokens.dai, 36000, 0, 0, BigNumber.from(10).pow(3), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    tx = await dex.userCmd(2, cmd, { gasLimit: 6000000})
    console.log(tx)
    await tx.wait()*/

    /*tx = await dex.swap(tokens.eth, tokens.dai, 36000, true, true, BigNumber.from(10).pow(12), 0, MAX_PRICE, 0, 0,
        {value: BigNumber.from(10).pow(12)})
    await tx.wait()

    tx = await dex.swap(tokens.eth, tokens.dai, 36000, false, true, BigNumber.from(10).pow(12), 0, MIN_PRICE, 0, 0)
    await tx.wait()*/

    /*tx = await dex.swap(tokens.dai, tokens.usdc, 36000, true, false, BigNumber.from(10).pow(2), 0, MAX_PRICE, 0, 0)
    await tx.wait()*/

    // Burn ambient
    /*cmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
        [41, tokens.eth, tokens.dai, 36000, 0, 0, BigNumber.from(10).pow(15), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    tx = await dex.userCmd(2, cmd, {gasLimit: 6000000})
    await tx.wait()*/
    
    // Remint
    /*cmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
        [31, tokens.eth, tokens.dai, 36000, 0, 0, BigNumber.from(10).pow(15), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    tx = await dex.userCmd(2, cmd, {gasLimit: 6000000, value: BigNumber.from(10).pow(15) })
    console.log(tx)
    await tx.wait()*/

    // Mint concentrated liquidity
    /*cmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
        [11, tokens.eth, tokens.dai, 36000, -128000+256, 128000-256, BigNumber.from(10).pow(15), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    tx = await dex.userCmd(128, cmd, {gasLimit: 6000000, value: BigNumber.from(10).pow(15) })
    console.log(tx)
    await tx.wait()*/

    /*cmd = abi.encode(["uint8", "address", "address", "uint256", "int24", "int24", "uint128", "uint128", "uint128", "uint8", "address"],
        [21, tokens.eth, tokens.dai, 36000, -128000+64, 128000-64, BigNumber.from(10).pow(15), MIN_PRICE, MAX_PRICE, 0, ZERO_ADDR ])
    tx = await dex.userCmd(2, cmd, {gasLimit: 6000000, value: BigNumber.from(10).pow(16) })
    console.log(tx)
    await tx.wait()*/
}

deploy()