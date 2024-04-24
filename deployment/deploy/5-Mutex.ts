const Logs = require("node-logs");
const logger = new Logs().showInConsole(true);
import { SAVED_DEPLOY_DATA, getOrDeployMutex } from "../helpers/reentrancy/utils";

const func = async function (hre) {
    const {
        deployments: { deploy, log, getOrNull },
        getNamedAccounts,
        network,
        ethers,
    } = hre;
    const { deployerAddress, contractAddress } = SAVED_DEPLOY_DATA;
    logger.warn("Deploying Mutex...");

    if (ethers.provider.getBalance(deployerAddress) === 0) {
        throw new Error("Deployer balance is zero");
    }

    const mutex = await getOrDeployMutex();
    if (mutex.address !== contractAddress) {
        throw new Error(`Mutex address is ${mutex.address}, expected ${contractAddress}`);
    }
    logger.warn("Mutex deployed");
};
func.tags = ["Mutex"];
module.exports = func;