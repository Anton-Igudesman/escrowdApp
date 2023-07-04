async function main() {
    const Escrow = await hre.ethers.getContractFactory("EscrowList");
    const escrow = await Escrow.deploy();
  
    await escrow.deployed();
  
    console.log(`Contract deployed to ${escrow.address}`);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });