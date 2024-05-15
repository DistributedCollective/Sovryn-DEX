import { TestPool, makeTokenPool, Token, POOL_IDX } from './FacadePool'
import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { toSqrtPrice, fromSqrtPrice, maxSqrtPrice, minSqrtPrice, MAX_PRICE, MIN_PRICE, Q_48 } from './FixedPoint';
import { solidity } from "ethereum-waffle";
import chai from "chai";
import { MockERC20 } from '../typechain/MockERC20';
import { MockLpConduit } from '../typechain/MockLpConduit';
import { ContractFactory } from 'ethers';
import { SdexLpErc20 } from '../typechain/SdexLpErc20';
import { SdexQuery } from '../typechain/SdexQuery';
import { AddressZero } from '@ethersproject/constants';

chai.use(solidity);

describe('Pool Conduit', () => {
    let test: TestPool
    let baseToken: Token
    let quoteToken: Token
    let conduit: SdexLpErc20
    let query: SdexQuery
    let sender: string
    let other: string
    const feeRate = 225 * 100

    beforeEach("deploy",  async () => {

       test = await makeTokenPool()
       baseToken = await test.base
       quoteToken = await test.quote

       await test.initPool(feeRate, 0, 1, 1.5)
       test.useHotPath = true

       let factory = await ethers.getContractFactory("SdexLpErc20") as ContractFactory

       const conduitAddress = await (await test.query).queryPoolLpTokenAddress(baseToken.address, quoteToken.address, test.poolIdx);
       conduit = await ethers.getContractAt("SdexLpErc20", conduitAddress) as SdexLpErc20;
       test.lpConduit = conduit.address;

       factory = await ethers.getContractFactory("SdexQuery") as ContractFactory
       query = (await factory.deploy((await test.dex).address)) as SdexQuery

       sender = await (await test.trader).getAddress()
       other = await (await test.other).getAddress()       
    })

    const MINT_BUFFER = 4

    it("mint and burn ambient", async() => {
        let initBal = await baseToken.balanceOf(sender)
        await test.testMintAmbient(5000)
        expect(await conduit.balanceOf(sender)).to.be.eq(5000*1024)
        
        await test.testBurnAmbient(5000)
        expect(await conduit.balanceOf(other)).to.be.eq(0)
        expect(await baseToken.balanceOf(sender)).to.be.eq(initBal.sub(MINT_BUFFER))
    })

    it("transfer LP token", async() => {
        let initBal = await baseToken.balanceOf(sender)
        let initBalOther = await baseToken.balanceOf(other)
        await test.testMintAmbient(5000)
        let collat = initBal.sub(await baseToken.balanceOf(sender))

        await conduit.transfer(other, 5000*1024)
        expect(await conduit.balanceOf(other)).to.be.eq(5000*1024)
        await test.testBurnAmbientFrom(await test.other, 5000)
        expect(await baseToken.balanceOf(other)).to.be.eq(initBalOther.add(collat.sub(MINT_BUFFER)))
    })
    
    it("no accept concentrated LP", async() => {
        let initBal = await baseToken.balanceOf(sender)
        await expect(test.testMint(-1000, 1000, 5000)).to.be.reverted
        await expect(test.testBurn(-1000, 1000, 5000)).to.be.reverted
    })

    it("wrong pool token", async() => {
        let testAlt = await makeTokenPool()
        let baseTokenAlt = await testAlt.base
        let quoteTokenAlt = await testAlt.quote
        await testAlt.initPool(feeRate, 0, 1, 1.5)

        // Wrong token
        let factory = await ethers.getContractFactory("SdexLpErc20") as ContractFactory
        conduit = (await factory.deploy()) as SdexLpErc20
        testAlt.lpConduit = conduit.address
        await testAlt.testMintAmbient(8000)

        test.lpConduit = conduit.address
        await expect(test.testMintAmbient(5000)).to.be.reverted
        await expect(test.testBurnAmbient(5000)).to.be.reverted
    })

    it("wrong pool index", async() => {
        // Wrong pool index
        let factory = await ethers.getContractFactory("SdexLpErc20") as ContractFactory
        conduit = (await factory.deploy()) as SdexLpErc20
        test.lpConduit = conduit.address
        await expect(test.testMintAmbient(5000)).to.be.reverted
    })
    
})
