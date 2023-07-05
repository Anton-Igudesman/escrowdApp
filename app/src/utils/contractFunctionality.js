import { ethers } from 'ethers';
import EscrowList from '../artifacts/contracts/EscrowList.sol/EscrowList.json';

const contractAddress = "0x76cAe033838845fBe7314B23471Ff8b8FDC5A33a";

export async function createContract(signer) {
    return new ethers.Contract(contractAddress, EscrowList.abi, signer)
}

export async function addMember(signer) {
    // const contract = await createContract(signer);
    // const tx = await contract.addMember();
    // return tx;
    const contract = new ethers.Contract(contractAddress, EscrowList.abi, signer);
    return contract.addMember();
    

}

export async function createEscrowAgreement(signer, arbiter, beneficiary, value) {
    const contract = await createContract(signer);
    return contract.createContract(arbiter, beneficiary, { value });
}

export async function getMember(signer) {
    const contract = await createContract(signer);
    const member = await contract.getMember();

    // setMember({
    //     depositorContracts: [member.despositorContracts],
    //     arbiterContracts: [member.arbiterContracts],
    //     beneficiaryContracts: [member.beneficiaryContracts],
    //     balance: member.balance,
    //     isAdded: member.isAdded,
    //     memberAdress: member.memberAddress
    // })

    // const depositorContracts = member.depositorContracts.map((contract, index) => ({
    //     ...contract,
    //     amount: ethers.utils.formatEther(contract.amount.toString())
    // }));

    // const arbiterContracts = member.arbiterContracts.map((contract, index) => ({
    //     ...contract,
    //     amount: ethers.utils.formatEther(contract.amount.toString())
    // }));

    // const beneficiaryContracts = member.beneficiaryContracts.map((contract, index) => ({
    //     ...contract,
    //     amount: ethers.utils.formatEther(contract.amount.toString())
    // }));

    // return[depositorContracts, arbiterContracts, beneficiaryContracts];
    console.log('member', member);
    return await member;
}

export async function approveContract(signer, transaction) {
    const contract = createContract(signer);
    return contract.approve(transaction);
}