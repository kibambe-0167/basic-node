async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString())

    const Token = await ethers.getContractFactory("MedicineContract");
    const token = await Token.deploy();

    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


// Account balance: 10000000000000000000000
// Token address: 0x5FbDB2315678afecb367f032d93F642f64180aa3