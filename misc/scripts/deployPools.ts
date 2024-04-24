
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
import { BootPath, KnockoutFlagPath, KnockoutLiqPath, SdexLpErc20 } from '../../typechain';
import { SdexSwapDex } from '../../typechain/SdexSwapDex';
import hre from "hardhat"
import { initChain } from '../libs/chain';

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

async function deployPools() {
    let dex = await createDexContracts()

    const { ethers, deployments: { get } } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    const { deployer } = await getNamedAccounts();
    let { poolConfigs } = initChain(chainIdHex.toString())

    console.log("===== Validating Pool config =====")
    for (const poolConfig of poolConfigs) {
        const baseToken = !poolConfig.baseToken.isNativeToken ? {
            ...poolConfig.baseToken,
            tokenAddress: (await get(poolConfig.baseToken.tokenDeploymentName)).address,
        } : {
            ...poolConfig.baseToken,
            tokenAddress: ethers.constants.AddressZero,
        }

        const quoteToken = !poolConfig.quoteToken.isNativeToken ? {
            ...poolConfig.quoteToken,
            tokenAddress: (await get(poolConfig.quoteToken.tokenDeploymentName)).address,
        } : {
            ...poolConfig.quoteToken,
            tokenAddress: ethers.constants.AddressZero,
        }

        if(compareAddresses(baseToken.tokenAddress, quoteToken.tokenAddress) === 0) {
            throw new Error(`Token ${baseToken.tokenSymbol} - ${baseToken.tokenAddress} has the identical address with quote token - ${quoteToken.tokenSymbol} (${quoteToken.tokenAddress})`);
        }
    }
    console.log("===== Done validating Pool config =====")

    /** Deploy pool */
    for (const poolConfig of poolConfigs) {
        const baseToken = !poolConfig.baseToken.isNativeToken ? {
            ...poolConfig.baseToken,
            tokenAddress: (await get(poolConfig.baseToken.tokenDeploymentName)).address,
        } : {
            ...poolConfig.baseToken,
            tokenAddress: ethers.constants.AddressZero,
        }

        const quoteToken = !poolConfig.quoteToken.isNativeToken ? {
            ...poolConfig.quoteToken,
            tokenAddress: (await get(poolConfig.quoteToken.tokenDeploymentName)).address,
        } : {
            ...poolConfig.quoteToken,
            tokenAddress: ethers.constants.AddressZero,
        }

        let baseTokenContract, quoteTokenContract;

        if(!baseToken.isNativeToken) {
            baseTokenContract = await ethers.getContract(poolConfig.baseToken.tokenDeploymentName)
        }
        
        if(!quoteToken.isNativeToken) {
            quoteTokenContract = await ethers.getContract(poolConfig.quoteToken.tokenDeploymentName)
        }
    
        console.log(`===== PROCESSING BASE TOKEN (${baseToken.tokenSymbol} - ${baseToken.tokenAddress}) & QUOTE TOKEN (${quoteToken.tokenSymbol} - ${quoteToken.tokenAddress}) =====`)
        let param: any = [];
        let conduit: SdexLpErc20;

        if(compareAddresses(baseToken.tokenAddress, quoteToken.tokenAddress) > 0) {
            /** Means the base token > quote token */
            param = [71, quoteToken.tokenAddress, baseToken.tokenAddress, poolConfig.poolIdx, toSqrtPrice(poolConfig.initialRate)]
        } else {
            /** Means the base token < sov token */
            param = [71, baseToken.tokenAddress, quoteToken.tokenAddress, poolConfig.poolIdx, toSqrtPrice(1/poolConfig.initialRate)]
        }

        let override: {value?: BigNumber, gasLimit: number} = { gasLimit: 9000000 };
        
        if(baseToken.isNativeToken || quoteToken.isNativeToken) {
            override = { value: BigNumber.from(10).pow(12), gasLimit: 9000000 };
        }

        if(!baseToken.isNativeToken) {
            // handle token approval
            const baseTokenAllowance = await baseTokenContract.allowance(deployer, dex.address);
            if(baseTokenAllowance.toString() === "0") {
                console.log(`===== APPROVE TX FOR BASE TOKEN (${baseToken.tokenSymbol} - ${baseToken.tokenAddress}) =====`)
                const tx = await baseTokenContract.approve(dex.address, "10000000") // max initial liq
                await tx.wait()
            }
        }

        if(!quoteToken.isNativeToken) {
            const quoteTokenAllowance = await quoteTokenContract.allowance(deployer, dex.address);
            if(quoteTokenAllowance.toString() === "0") {
                console.log(`===== APPROVE TX FOR QUOTE TOKEN (${quoteToken.tokenSymbol} - ${quoteToken.tokenAddress}) =====`)
                const tx = await quoteTokenContract.approve(dex.address, "10000000") // max initial liq
                await tx.wait()
            }
        }

        console.log(`===== SENDING TX FOR BASE TOKEN (${baseToken.tokenSymbol} - ${baseToken.tokenAddress}) & QUOTE TOKEN (${quoteToken.tokenSymbol} - ${quoteToken.tokenAddress}) =====`)
        let initPoolCmd = abi.encode(["uint8", "address", "address", "uint256", "uint128"], param);
        const tx = await dex.userCmd(3, initPoolCmd, override)
        console.log(tx)
        await tx.wait()
    }
}

deployPools()