const artifacts = require("../artifacts/contracts/LifeForce.sol/LifeForce.json");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(/**"https://polygon-mumbai.g.alchemy.com/v2/PPT8_0p08mlvodQAMMxn93kYxlMyf7mG" */"http://127.0.0.1:7545");
    const wallet = new ethers.Wallet(/**"5da121d1e61c94c5cf5a8cc9ec335e655804829a56ccbb09a0115d2e5c631961" */"88ecd07bd22885174c7d756a8aff317e553033c175e74af1399b98e4bcefd703", provider);

    console.log("Deploying contracts with the account:", wallet.address);

    console.log("Account balance:", (await wallet.getBalance()).toString());

    const LifeForce = await ethers.getContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    const lifeForce = await LifeForce.deploy();

    await lifeForce.deployed();

    console.log("LifeForce address:", lifeForce.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });