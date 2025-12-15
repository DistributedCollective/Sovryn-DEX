import { task } from "hardhat/config";
import { ethers } from "hardhat";

// Replace with actual values or pass as params
const SDEX_POLICY_ADDRESS = "0x22Bdd8B71928003473EfA83cd69689cc04507cd9";
const MINION_ADDRESS = "0xe5bc234A484A912A61Aa74501960cFc202e773dA";
const COLD_PROXY_IDX = 3; // Replace with actual SdexSlots.COLD_PROXY_IDX value
const SAFE_MODE_PROXY_PATH = 9999;

const SDEX_POLICY_ABI = [
    "function treasuryResolution(address minion, uint16 proxyPath, bytes cmd, bool sudo)",
];

const PROTOCOL_CMD_ABI = [
    "function encodeHotPath(bool enable) pure returns (bytes memory)",
    "function encodeSafeMode(bool enable) pure returns (bytes memory)",
];

// If ProtocolCmd is a library, you may need to hardcode the encoded data:
function encodeHotPath(enable: boolean): string {
    // HOT_OPEN_CODE = 22 (from ProtocolCmd.sol)
    // Solidity: abi.encode(uint8, bool) => pad both to 32 bytes
    const abi = require("ethers").utils.defaultAbiCoder;
    return abi.encode(["uint8", "bool"], [22, enable]);
}

function encodeSafeMode(enable: boolean): string {
    // SAFE_MODE_CODE = 23 (from ProtocolCmd.sol)
    const abi = require("ethers").utils.defaultAbiCoder;
    return abi.encode(["uint8", "bool"], [23, enable]);
}

// Hardhat task to generate calldata for unpausing the DEX
// Pausing - call the emergencyHalt function on the SdexPolicy contract from the owner Safe multisig
// Usage: npx hardhat generate-unpause-calldata --policy <address> --minion <address> --proxy <idx>
task(
    "generate-unpause-calldata",
    "Generates calldata for Safe multisig to unpause the DEX"
).setAction(async (taskArgs, hre) => {
    const {
        ethers,
        deployments: { get },
    } = hre;
    const policyIface = new ethers.utils.Interface(SDEX_POLICY_ABI);
    // If you have ProtocolCmd ABI, use it to encode, otherwise use placeholder
    // const protocolCmd = await ethers.getContractAt("ProtocolCmd", ...);
    // const hotPathCmd = await protocolCmd.encodeHotPath(true);
    // const safeModeCmd = await protocolCmd.encodeSafeMode(false);
    const hotPathCmd = encodeHotPath(true); // Replace with actual encoding if needed
    const safeModeCmd = encodeSafeMode(false); // Replace with actual encoding if needed

    const tx1 = policyIface.encodeFunctionData("treasuryResolution", [
        MINION_ADDRESS,
        COLD_PROXY_IDX,
        hotPathCmd,
        true,
    ]);
    const tx2 = policyIface.encodeFunctionData("treasuryResolution", [
        MINION_ADDRESS,
        SAFE_MODE_PROXY_PATH,
        safeModeCmd,
        true,
    ]);

    console.log("Tx1 (enable hot path):", tx1);
    console.log("Tx2 (disable safe mode):", tx2);
    console.log("\nUse these as calldata in your Safe multisig transactions.");
});
