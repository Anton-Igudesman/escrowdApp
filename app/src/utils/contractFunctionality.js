import { ethers } from 'ethers';
const EscrowList = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "contractId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Approved",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "addMember",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_id",
          "type": "bytes32"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contractsArray",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "contractId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "arbiter",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isApproved",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isCreated",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_arbiter",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "createContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMember",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "memberAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "contractId",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "depositor",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isCreated",
                  "type": "bool"
                }
              ],
              "internalType": "struct EscrowList.ContractDetails[]",
              "name": "arbiterContracts",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "contractId",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "depositor",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isCreated",
                  "type": "bool"
                }
              ],
              "internalType": "struct EscrowList.ContractDetails[]",
              "name": "depositorContracts",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "contractId",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "depositor",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isApproved",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isCreated",
                  "type": "bool"
                }
              ],
              "internalType": "struct EscrowList.ContractDetails[]",
              "name": "beneficiaryContracts",
              "type": "tuple[]"
            },
            {
              "internalType": "bool",
              "name": "isAdded",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "internalType": "struct EscrowList.Members",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "members",
      "outputs": [
        {
          "internalType": "address",
          "name": "memberAddress",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isAdded",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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