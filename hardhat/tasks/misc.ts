import { HardhatRuntimeEnvironment } from "hardhat/types";
const { task, types } = require("hardhat/config");
const Logs = require("node-logs");
const logger = new Logs().showInConsole(true);
const {
    impersonateAccount,
    mine,
    time,
    setBalance,
} = require("@nomicfoundation/hardhat-network-helpers");

const getImpersonatedSigner = async (hre: HardhatRuntimeEnvironment, addressToImpersonate) => {
    const { ethers } = hre;
    await impersonateAccount(addressToImpersonate);
    return await ethers.getSigner(addressToImpersonate);
};

const getImpersonatedSignerFromJsonRpcProvider = async (hre: HardhatRuntimeEnvironment, addressToImpersonate) => {
    //await impersonateAccount(addressToImpersonate);
    //return await ethers.getSigner(addressToImpersonate);
    const { ethers } = hre;
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    await provider.send("hardhat_impersonateAccount", [addressToImpersonate]);
    return provider.getSigner(addressToImpersonate);
};

task("misc:forkedchain:fundAccount", "Fund an account for a forked chain")
    .addParam("account", "account to fund")
    .addParam("amount", "amount to fund in BTC")
    .addOptionalParam("token", "'RBTC' or token name, default: 'SOV'", "SOV")
    .setAction(async ({ account, amount, token }, hre) => {
        const {
            ethers,
            deployments: { get },
        } = hre;
        if (!hre.network.tags["forked"]) {
            logger.error("Can run only on a forked network");
        }
        const accountAddress = ethers.utils.isAddress(account)
            ? account
            : (await hre.getNamedAccounts())[account];

        if (!ethers.utils.isAddress(accountAddress)) {
            throw Error("Invalid account to fund!");
        }

        if (token === "RBTC") {
            await setBalance(accountAddress, ethers.utils.parseEther(amount));
            logger.success(`RBTC balance: ${await ethers.provider.getBalance(accountAddress)}`);
        } else {
            const tokenContract = ethers.utils.isAddress(token)
                ? await ethers.getContractAt("SOV", token)
                : await ethers.getContract(token);

            const signer = await getImpersonatedSignerFromJsonRpcProvider(hre, 
                await tokenContract.owner()
            );
            // console.log("signer:", signer);
            // console.log("await tokenContract.owner():", await tokenContract.owner());
            await setBalance(signer._address, ethers.utils.parseEther("1.0"));

            await tokenContract
                .connect(signer)
                .mint(accountAddress, ethers.utils.parseEther(amount));
            logger.success(
                `Token (${
                    tokenContract.address
                }) user's (${accountAddress}) balance: ${await tokenContract.balanceOf(
                    accountAddress
                )}`
            );
        }
    });