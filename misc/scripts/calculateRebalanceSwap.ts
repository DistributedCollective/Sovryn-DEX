import { ethers } from "hardhat";
import { toSqrtPrice, fromSqrtPrice } from "../../test/FixedPoint";
import { SdexQuery, SdexImpact } from "../../typechain";
import { BigNumber } from "ethers";

const CURRENT_PRICE = 0.09768; // 1 SOV = 0.09768 oUSDT
const TARGET_PRICE = 0.113; // Target: 1 SOV = 0.113 oUSDT
const POOL_IDX = 410; // From poolConfig.ts

function compareAddresses(addr1: string, addr2: string): number {
    return addr1.toLowerCase().localeCompare(addr2.toLowerCase());
}

async function calculateRebalanceSwap() {
    const {
        ethers,
        deployments: { get },
    } = hre;

    console.log("=".repeat(80));
    console.log("SOV/oUSDT Pool Rebalance Calculator");
    console.log("=".repeat(80));
    console.log(`Current Price: ${CURRENT_PRICE} oUSDT per SOV`);
    console.log(`Target Price:  ${TARGET_PRICE} oUSDT per SOV`);
    console.log(`Pool Index:    ${POOL_IDX}\n`);

    try {
        // Get contract addresses
        const sovToken = await get("SOV");
        const ousdtToken = await get("oUSDT");
        const sdexQueryAddress = (await get("SdexQuery")).address;
        const sdexImpactAddress = (await get("SdexImpact")).address;

        console.log("Token Addresses:");
        console.log(`  SOV:   ${sovToken.address}`);
        console.log(`  oUSDT: ${ousdtToken.address}\n`);

        // Attach contracts
        const sdexQuery = (await ethers.getContractAt("SdexQuery", sdexQueryAddress)) as SdexQuery;
        const sdexImpact = (await ethers.getContractAt(
            "SdexImpact",
            sdexImpactAddress
        )) as SdexImpact;

        // Get token decimals
        const sovContract = await ethers.getContractAt("ERC20", sovToken.address);
        const ousdtContract = await ethers.getContractAt("ERC20", ousdtToken.address);
        const sovDecimals = await sovContract.decimals();
        const ousdtDecimals = await ousdtContract.decimals();

        console.log("Token Decimals:");
        console.log(`  SOV:   ${sovDecimals}`);
        console.log(`  oUSDT: ${ousdtDecimals}\n`);

        // Determine token order (DEX sorts by address)
        const comparison = compareAddresses(sovToken.address, ousdtToken.address);
        const [baseToken, quoteToken, baseSymbol, quoteSymbol, baseDecimals, quoteDecimals] =
            comparison > 0
                ? [
                      ousdtToken.address,
                      sovToken.address,
                      "oUSDT",
                      "SOV",
                      ousdtDecimals,
                      sovDecimals,
                  ]
                : [
                      sovToken.address,
                      ousdtToken.address,
                      "SOV",
                      "oUSDT",
                      sovDecimals,
                      ousdtDecimals,
                  ];

        console.log("DEX Token Order:");
        console.log(`  Base:  ${baseSymbol} (${baseToken})`);
        console.log(`  Quote: ${quoteSymbol} (${quoteToken})\n`);

        // Query current pool state
        const curve = await sdexQuery.queryCurve(baseToken, quoteToken, POOL_IDX);
        const liquidity = await sdexQuery.queryLiquidity(baseToken, quoteToken, POOL_IDX);
        const sqrtPrice = await sdexQuery.queryPrice(baseToken, quoteToken, POOL_IDX);

        // Convert sqrt price to actual price
        const rawPrice = fromSqrtPrice(sqrtPrice);
        const decimalAdjustment = Math.pow(10, quoteDecimals - baseDecimals);
        const actualPrice =
            comparison > 0 ? 1 / (rawPrice * decimalAdjustment) : rawPrice * decimalAdjustment;

        console.log("Current Pool State:");
        console.log(`  Sqrt Price (raw): ${sqrtPrice.toString()}`);
        console.log(`  Actual Price:     ${actualPrice} ${quoteSymbol} per ${baseSymbol}`);
        console.log(`  Active Liquidity: ${liquidity.toString()}\n`);

        if (liquidity.eq(0)) {
            console.error("❌ ERROR: Pool has no liquidity!");
            return;
        }

        // Calculate target sqrt price
        // Need to adjust target price based on token order
        let targetPriceAdjusted = TARGET_PRICE;
        if (comparison > 0) {
            // If SOV is quote and oUSDT is base, we need to invert
            targetPriceAdjusted = 1 / TARGET_PRICE;
        }

        // Adjust for decimals
        const targetPriceRaw = targetPriceAdjusted / decimalAdjustment;
        const targetSqrtPrice = toSqrtPrice(targetPriceRaw);

        console.log("Target Price Calculation:");
        console.log(`  Target (SOV/oUSDT): ${TARGET_PRICE}`);
        console.log(`  Target (adjusted):  ${targetPriceAdjusted}`);
        console.log(`  Target (raw):       ${targetPriceRaw}`);
        console.log(`  Target Sqrt Price:  ${targetSqrtPrice.toString()}\n`);

        // Determine swap direction
        const needsToBuyBase = sqrtPrice.lt(targetSqrtPrice);
        console.log("Swap Direction:");
        console.log(`  Need to buy ${needsToBuyBase ? baseSymbol : quoteSymbol}`);
        console.log(
            `  By swapping ${needsToBuyBase ? quoteSymbol : baseSymbol} → ${needsToBuyBase ? baseSymbol : quoteSymbol}\n`
        );

        // For SOV/oUSDT: to increase price from 0.09768 to 0.113, we need to buy SOV (swap oUSDT → SOV)
        const isBuy = needsToBuyBase;

        // Binary search for optimal swap amount
        console.log("Searching for optimal swap amount...\n");

        let low = BigNumber.from(1); // Start with 1 wei
        let high = ethers.utils.parseUnits("100", quoteDecimals); // Max 100 tokens
        let optimalAmount = BigNumber.from(0);
        let finalPriceDecimal = 0;
        let baseFlowResult = BigNumber.from(0);
        let quoteFlowResult = BigNumber.from(0);

        const targetPriceTolerance = 0.0001; // 0.01% tolerance

        for (let i = 0; i < 100; i++) {
            const mid = low.add(high).div(2);

            try {
                // Simulate swap
                const [baseFlow, quoteFlow, finalPrice] = await sdexImpact.calcImpact(
                    baseToken,
                    quoteToken,
                    POOL_IDX,
                    isBuy, // isBuy
                    false, // inBaseQty = false (we're specifying the quote token amount)
                    mid, // amount to swap
                    0, // poolTip
                    targetSqrtPrice // limitPrice
                );

                const finalPriceRawCalc = fromSqrtPrice(finalPrice);
                const finalPriceAdjusted =
                    comparison > 0
                        ? 1 / (finalPriceRawCalc * decimalAdjustment)
                        : finalPriceRawCalc * decimalAdjustment;

                finalPriceDecimal = finalPriceAdjusted;

                if (i % 10 === 0) {
                    console.log(
                        `  Iteration ${i}: Testing ${ethers.utils.formatUnits(mid, quoteDecimals)} ${quoteSymbol} → Final price: ${finalPriceDecimal.toFixed(6)}`
                    );
                }

                if (Math.abs(finalPriceDecimal - TARGET_PRICE) < targetPriceTolerance) {
                    // Close enough!
                    optimalAmount = mid;
                    baseFlowResult = baseFlow;
                    quoteFlowResult = quoteFlow;
                    console.log(`\n✓ Found optimal amount after ${i + 1} iterations!\n`);
                    break;
                } else if (finalPriceDecimal < TARGET_PRICE) {
                    // Need to swap more to increase price
                    low = mid.add(1);
                } else {
                    // Swapped too much, decrease amount
                    high = mid.sub(1);
                }

                if (i === 99) {
                    optimalAmount = mid;
                    baseFlowResult = baseFlow;
                    quoteFlowResult = quoteFlow;
                    console.log(`\n⚠ Reached max iterations. Using best estimate.\n`);
                }
            } catch (error) {
                // Swap would exceed limit or fail, reduce amount
                high = mid.sub(1);
            }
        }

        console.log("=".repeat(80));
        console.log("REBALANCE SWAP DETAILS");
        console.log("=".repeat(80));

        if (optimalAmount.gt(0)) {
            // Determine which token is being swapped
            const swapIn = isBuy ? quoteSymbol : baseSymbol;
            const swapOut = isBuy ? baseSymbol : quoteSymbol;
            const swapInDecimals = isBuy ? quoteDecimals : baseDecimals;
            const swapOutDecimals = isBuy ? baseDecimals : quoteDecimals;
            const amountIn = isBuy ? quoteFlowResult : baseFlowResult;
            const amountOut = isBuy ? baseFlowResult : quoteFlowResult;

            console.log(`\nSwap Direction: ${swapIn} → ${swapOut}`);
            console.log(
                `Amount to swap IN:  ${ethers.utils.formatUnits(amountIn.abs(), swapInDecimals)} ${swapIn}`
            );
            console.log(
                `Amount to receive:  ${ethers.utils.formatUnits(amountOut.abs(), swapOutDecimals)} ${swapOut}`
            );
            console.log(`\nFinal Price: ${finalPriceDecimal.toFixed(6)} oUSDT per SOV`);
            console.log(`Target Price: ${TARGET_PRICE} oUSDT per SOV`);
            console.log(
                `Price Difference: ${((Math.abs(finalPriceDecimal - TARGET_PRICE) / TARGET_PRICE) * 100).toFixed(4)}%`
            );

            // Provide swap command parameters
            console.log("\n" + "=".repeat(80));
            console.log("SWAP COMMAND PARAMETERS");
            console.log("=".repeat(80));
            console.log(`\nTo execute this swap, use the following parameters:`);
            console.log(`  Base Token:    ${baseToken}`);
            console.log(`  Quote Token:   ${quoteToken}`);
            console.log(`  Pool Index:    ${POOL_IDX}`);
            console.log(`  isBuy:         ${isBuy}`);
            console.log(`  inBaseQty:     false`);
            console.log(`  qty:           ${optimalAmount.toString()}`);
            console.log(`  limitPrice:    ${targetSqrtPrice.toString()}`);

            console.log(`\nIn human-readable terms:`);
            console.log(`  Swap ${ethers.utils.formatUnits(amountIn.abs(), swapInDecimals)} ${swapIn}`);
            console.log(`  To receive approximately ${ethers.utils.formatUnits(amountOut.abs(), swapOutDecimals)} ${swapOut}`);
        } else {
            console.log("\n❌ Could not find a valid swap amount!");
        }

        console.log("\n" + "=".repeat(80));
    } catch (error) {
        console.error("\n❌ ERROR:", (error as Error).message);
        console.error((error as Error).stack);
        throw error;
    }
}

calculateRebalanceSwap()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


