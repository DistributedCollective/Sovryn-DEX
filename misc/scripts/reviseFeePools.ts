
import { ethers, getNamedAccounts } from 'hardhat';
import { ContractFactory, BytesLike, BigNumber, Signer, logger } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { toSqrtPrice, fromSqrtPrice, MIN_PRICE, MAX_PRICE, MIN_TICK, ZERO_ADDR } from '../../test/FixedPoint';
import { MockERC20 } from '../../typechain/MockERC20';
import { QueryHelper } from '../../typechain/QueryHelper';
import { IERC20Minimal } from '../../typechain/IERC20Minimal';
import { ColdPath } from '../../typechain/ColdPath';
import { AddressZero } from '@ethersproject/constants';
import { WarmPath } from '../../typechain/WarmPath';
import { LongPath } from '../../typechain/LongPath';
import { MicroPaths } from '../../typechain/MicroPaths';
import { HotPath } from '../../typechain/HotPath';
import { BootPath, KnockoutFlagPath, KnockoutLiqPath, SdexLpErc20, SdexPolicy, SdexQuery } from '../../typechain';
import { SdexSwapDex } from '../../typechain/SdexSwapDex';
import hre from "hardhat"
import { inflateAddr, initChain, initProvider, traceContractTx } from '../libs/chain';
import { AbiCoder } from '@ethersproject/abi';
import { COLD_PROXY_IDX } from '../constants/addrs';

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

let abi = new ethers.utils.AbiCoder()
const override = { gasLimit: 6000000 }

const poolsToRevise = [
    {
        baseToken: {
            tokenSymbol: "eDLLR",
            tokenDeploymentName: "MOCK2_DLLR",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        poolIdx: 400,
        newFee: 3500, // 0.35%
    },
    {
        baseToken: {
            tokenSymbol: "WBTC",
            tokenDeploymentName: "MOCK2_WBTC",
            isNativeToken: false,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        poolIdx: 400,
        newFee: 3500, // 0.35%
    },
    {
        baseToken: {
            tokenSymbol: "ETH",
            tokenDeploymentName: "ETH",
            isNativeToken: true,
        },
        quoteToken: {
            tokenSymbol: "eSOV",
            tokenDeploymentName: "MOCK2_eSOV",
            isNativeToken: false,
        },
        poolIdx: 400,
        newFee: 3500, // 0.35%
    },
    // {
    //     baseToken: {
    //         tokenSymbol: "POWA",
    //         tokenDeploymentName: "MOCK2_POWA",
    //         isNativeToken: false,
    //     },
    //     quoteToken: {
    //         tokenSymbol: "eSOV",
    //         tokenDeploymentName: "MOCK2_eSOV",
    //         isNativeToken: false,
    //     },
    //     poolIdx: 400,
    //     newFee: 5000, // 0.5%
    // },
]

/** Function to compare 2 addresses
 * @param address1 first address
 * @param address2 second address
 * return:
 * 1 -> address1 > address2
 * -1 -> address1 < address2
 * 0 address1 = address2
 */
function compareAddresses(address1: string, address2: string) {
    // Remove '0x' prefix if present
    address1 = address1.toLowerCase().replace(/^0x/i, '');
    address2 = address2.toLowerCase().replace(/^0x/i, '');

    // Pad addresses with zeros to make them equal length
    const maxLength = Math.max(address1.length, address2.length);
    address1 = address1.padStart(maxLength, '0');
    address2 = address2.padStart(maxLength, '0');

    // Compare addresses numerically
    for (let i = 0; i < maxLength; i++) {
        const char1 = parseInt(address1[i], 16);
        const char2 = parseInt(address2[i], 16);
        
        if (char1 > char2) {
            return 1;
        } else if (char1 < char2) {
            return -1;
        }
    }
    
    // If all characters are equal
    return 0;
}

async function createDexContracts(): Promise<SdexSwapDex> {
    const { ethers } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    let { addrs } = initChain(chainIdHex.toString())

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
    console.log(dex.address);
    addrs.dex = dex.address

    console.log(addrs)
    return dex
}

async function reviseFeePools() {
    let dex = await createDexContracts()

    const { ethers, deployments: { get } } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    const { deployer } = await getNamedAccounts();
    let abiCoder = new ethers.utils.AbiCoder()
    let { addrs } = initProvider(chainIdHex.toString());
    let { wallet: authority } = initChain(chainIdHex.toString())
    let policy = (await inflateAddr("SdexPolicy", addrs.policy, authority)) as SdexPolicy
    let query = (await inflateAddr("SdexQuery", addrs.query, authority)) as SdexQuery

    /** Revise Fee Pools for SOV Pairs */
    for (const poolToRevise of poolsToRevise) {
        const baseToken = !poolToRevise.baseToken.isNativeToken ? {
            ...poolToRevise.baseToken,
            tokenAddress: (await get(poolToRevise.baseToken.tokenDeploymentName)).address,
        } : {
            ...poolToRevise.baseToken,
            tokenAddress: ethers.constants.AddressZero,
        }

        const quoteToken = !poolToRevise.quoteToken.isNativeToken ? {
            ...poolToRevise.quoteToken,
            tokenAddress: (await get(poolToRevise.quoteToken.tokenDeploymentName)).address,
        } : {
            ...poolToRevise.quoteToken,
            tokenAddress: ethers.constants.AddressZero,
        }
    
        console.log(`===== REVISING BASE TOKEN (${baseToken.tokenSymbol} - ${baseToken.tokenAddress}) & QUOTE TOKEN (${quoteToken.tokenSymbol} - ${quoteToken.tokenAddress}) =====`)
        let cmd;

        if(compareAddresses(baseToken.tokenAddress, quoteToken.tokenAddress) > 0) {
            /** Means the base token > quote token */
            const poolParams = await query.queryPoolParams(quoteToken.tokenAddress, baseToken.tokenAddress, poolToRevise.poolIdx);
            cmd = abiCoder.encode(["uint8", "address", "address", "uint256", "uint16", "uint16", "uint8", "uint8"],
            [111, quoteToken.tokenAddress, baseToken.tokenAddress, poolToRevise.poolIdx, poolToRevise.newFee, poolParams.tickSize_, poolParams.jitThresh_, poolParams.knockoutBits_])
        } else {
            /** Means the base token < sov token */
            const poolParams = await query.queryPoolParams(baseToken.tokenAddress, quoteToken.tokenAddress, poolToRevise.poolIdx);
            /** Means the base token > quote token */
            cmd = abiCoder.encode(["uint8", "address", "address", "uint256", "uint16", "uint16", "uint8", "uint8"],
            [111, baseToken.tokenAddress, quoteToken.tokenAddress, poolToRevise.poolIdx, poolToRevise.newFee, poolParams.tickSize_, poolParams.jitThresh_, poolParams.knockoutBits_])
        }

        console.log(`===== SENDING TX FOR REVISE FEE: BASE TOKEN (${baseToken.tokenSymbol} - ${baseToken.tokenAddress}) & QUOTE TOKEN (${quoteToken.tokenSymbol} - ${quoteToken.tokenAddress}) =====`)
        await traceContractTx(policy.opsResolution(addrs.dex, COLD_PROXY_IDX, 
            cmd, override), "Revise pool param")
    }
}

reviseFeePools()