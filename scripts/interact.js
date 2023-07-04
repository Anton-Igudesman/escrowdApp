const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const sepoliaURL = "http://127.0.0.1:8545";
//const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(sepoliaURL);



const depositorAddress = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const depositorPrivateKey = "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd";

const depositor2Address = "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec";
const depositor2PrivateKey = "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd";

const arbitorAddress  = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
const arbitorPrivateKey = "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0";

const beneficiaryAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
const beneficiaryPrivateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"

const {Wallet} = require("ethers");

const depositorWallet = new Wallet(depositorPrivateKey, provider);
const depositorWallet2 = new Wallet(depositor2PrivateKey, provider);
const arbitorWallet = new Wallet(arbitorPrivateKey, provider);
const beneficiaryWallet = new Wallet(beneficiaryPrivateKey, provider);



async function main() {
    const escrow = await hre.ethers.getContractAt('EscrowList', contractAddress);
    // console.log(escrow);
    // console.log('hello');
    // console.log(await wallet.getBalance());

    // const tx1 = await escrow.connect(wallet).createContract(arbitorAddress, beneficiaryAddress, {value: 100000000});
    // await tx1.wait();

    // const tx2 = await escrow.connect(wallet).createContract(arbitorAddress, beneficiaryAddress, {value: 1003324});
    // await tx2.wait();

    // const tx3 = await escrow.connect(wallet).createContract("0xcd3B766CCDd6AE721141F452C550Ca635964ce71", beneficiaryAddress, {value: 1231231231});
    // await tx3.wait();

    // const contractsList = await escrow.connect(wallet).getContracts();

    // contractsList.forEach(contract => console.log(contract.arbiter, contract.amount));

    // const approvals = await escrow.connect(arbitorWallet).getApprovals();
    // console.log(approvals)

    const tx1 = await escrow.connect(depositorWallet).addMember();
    const tx2 = await escrow.connect(arbitorWallet).addMember();
    const tx3 = await escrow.connect(beneficiaryWallet).addMember();
    const tx12 = await escrow.connect(depositorWallet2).addMember();

    async() => {
        await tx1.wait(), tx2.wait(), tx3.wait(), tx12.wait();
    }

    console.log('depositor: ', tx1, 'arbitor: ', tx2, 'beneficiary: ',  tx3);

    const tx4 = await depositorWallet.getBalance();
    const etherBalance = hre.ethers.utils.formatEther(tx4);
    console.log(etherBalance);

    const tx5 = await escrow.connect(depositorWallet).createContract(arbitorAddress, beneficiaryAddress, {value: 100001});
    const tx6 = await escrow.connect(depositorWallet2).createContract(arbitorAddress, beneficiaryAddress, {value: 1494371});
    const tx7 = await escrow.connect(arbitorWallet).getMember();
    const tx8 = await escrow.connect(depositorWallet).getMember();


    console.log(tx7.arbiterContracts);
        
    const tx9 = await escrow.connect(arbitorWallet).approve("0xcadbc3aaf43ab8942caeca9e904f949b8c61338faaeff2baf60ad416077d5979");
    
    const tx10 = await escrow.connect(arbitorWallet).getMember();

    console.log(tx10);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })