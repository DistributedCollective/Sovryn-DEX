
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

let abi = new ethers.utils.AbiCoder()
const override = { gasLimit: 6000000 }

const tokens = [
    {
      "tokenSymbol": "MOCK_WBTC",
      "totalAmount": "3346968694"
    },
    {
      "tokenSymbol": "MOCK_tBTC",
      "totalAmount": "5713852530211924187"
    },
    {
      "tokenSymbol": "MOCK_rETH",
      "totalAmount": "6575056906071718205"
    },
    {
      "tokenSymbol": "MOCK_WSTETH",
      "totalAmount": "12034115611515487841"
    },
    {
      "tokenSymbol": "MOCK_USDT",
      "totalAmount": "28231072603"
    },
    {
      "tokenSymbol": "MOCK_USDC",
      "totalAmount": "161363412943"
    },
    {
      "tokenSymbol": "MOCK_DAI",
      "totalAmount": "14889096210936062366664"
    },
    {
      "tokenSymbol": "MOCK_SOV",
      "totalAmount": "5187686000000000000000000"
    }
]

async function distributeToken() {
    const { ethers, deployments: { get } } = hre;
    const chainIdHex = ethers.utils.hexlify((await ethers.provider.getNetwork()).chainId)
    const { deployer } = await getNamedAccounts();
    let { poolConfigs } = initChain(chainIdHex.toString())
    const treasuryGuardianAddress = "0x6d1AaeDD72cCE8743Fbf5B57F26DE6Ef8eD927b7";

    /** Deploy pool */
    for (const token of tokens) {
        const tokenContract = await ethers.getContract(token.tokenSymbol)
        
        console.log(`===== PROCESSING TOKEN ${token.tokenSymbol} =====`)

        const tx = await tokenContract.mint(treasuryGuardianAddress, token.totalAmount)

        console.log(tx)
        await tx.wait()
    }
}

distributeToken()