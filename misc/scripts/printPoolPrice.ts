import { SDEX_POOL_CONFIGS } from "../constants/poolConfig";
import { fromSqrtPrice } from "../../test/FixedPoint";
import { SdexQuery } from "../../typechain";

function compareAddresses(addr1: string, addr2: string): number {
    return addr1.toLowerCase().localeCompare(addr2.toLowerCase());
}

async function main() {
    const { ethers, deployments: { get } } = hre;
    // Get the network
    const network = await ethers.provider.getNetwork();
    const chainId = network.chainId.toString(16); // Convert to hex
    
    // Get pool configs for the current network
    const poolConfigs = SDEX_POOL_CONFIGS[`0x${chainId}`];
    if (!poolConfigs) {
        console.error(`No pool configs found for chain ID 0x${chainId}`);
        return;
    }

    // Get SdexQuery contract
    const sdexQueryAddress = (await get("SdexQuery")).address;
    const sdexQuery = await ethers.getContractAt("SdexQuery", sdexQueryAddress) as SdexQuery;

    // Print header
    console.log("\nPool Prices:");
    console.log("=============");

    // Iterate through all pools
    for (const pool of poolConfigs) {
        try {
            // Get token contracts
            const token1 = await get(pool.baseToken.tokenDeploymentName);
            const token2 = await get(pool.quoteToken.tokenDeploymentName);
            
            if (!token1.address || !token2.address) {
                console.log(`Skipping ${pool.baseToken.tokenSymbol}/${pool.quoteToken.tokenSymbol} - Missing token address`);
                continue;
            }

            // Get token contracts to read decimals
            const token1Contract = await ethers.getContractAt("ERC20", token1.address);
            const token2Contract = await ethers.getContractAt("ERC20", token2.address);
            
            // Get decimals
            const token1Decimals = pool.baseToken.isNativeToken ? 18 : await token1Contract.decimals();
            const token2Decimals = pool.quoteToken.isNativeToken ? 18 : await token2Contract.decimals();

            // Compare addresses to determine order
            const comparison = compareAddresses(token1.address, token2.address);
            const [baseToken, quoteToken, baseSymbol, quoteSymbol, baseDecimals, quoteDecimals] = comparison > 0
                ? [token2.address, token1.address, pool.quoteToken.tokenSymbol, pool.baseToken.tokenSymbol, token2Decimals, token1Decimals]
                : [token1.address, token2.address, pool.baseToken.tokenSymbol, pool.quoteToken.tokenSymbol, token1Decimals, token2Decimals];

            // Query current price
            const sqrtPrice = await sdexQuery.queryPrice(baseToken, quoteToken, pool.poolIdx);
            const rawPrice = fromSqrtPrice(sqrtPrice);

            // Adjust price for decimals
            const decimalAdjustment = Math.pow(10, quoteDecimals - baseDecimals);
            const adjustedPrice = comparison > 0 
                ? 1 / (rawPrice * decimalAdjustment)
                : rawPrice * decimalAdjustment;

            console.log(`\n${pool.baseToken.tokenSymbol}/${pool.quoteToken.tokenSymbol}:`);
            console.log(`Initial Rate: ${pool.initialRate}`);
            console.log(`Current Rate: ${adjustedPrice}`);
            console.log(`Meaning:`);
            console.log(`  1 ${baseSymbol} = ${adjustedPrice} ${quoteSymbol}`);
            console.log(`  1 ${quoteSymbol} = ${1/adjustedPrice} ${baseSymbol}`);
            console.log(`Pool Index: ${pool.poolIdx}`);
            console.log(`Base Token (${baseSymbol}): ${baseToken} (${baseDecimals} decimals)`);
            console.log(`Quote Token (${quoteSymbol}): ${quoteToken} (${quoteDecimals} decimals)`);
        } catch (error) {
            console.error(`Error querying ${pool.baseToken.tokenSymbol}/${pool.quoteToken.tokenSymbol}:`, (error as Error).message);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });