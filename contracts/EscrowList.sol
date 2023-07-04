// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract EscrowList {

	struct ContractDetails {
		bytes32 contractId;
		address depositor;
		address arbiter;
		address beneficiary;
		uint256 amount;
		bool isApproved;
		bool isCreated;
	}

	struct Members {
		address memberAddress;
		ContractDetails[] arbiterContracts;
		ContractDetails[] depositorContracts;
		ContractDetails[] beneficiaryContracts;
		bool isAdded;
		uint256 balance;
	}

	mapping (address => Members) public members;

	function addMember() external {
		members[msg.sender].memberAddress = msg.sender;
		members[msg.sender].isAdded = true;
		members[msg.sender].balance = msg.sender.balance;
	}

	function getMember() public view returns (Members memory) {
		return members[msg.sender];
	}

	ContractDetails[] public contractsArray;

	function createContract(address _arbiter, address _beneficiary) external payable {
		require(msg.value > 0, "You must specify an amount");
		require(members[msg.sender].isAdded, "You must be a member to transact");
		require(members[_arbiter].isAdded, "Arbiter must be a member to authorize payment");
		require(members[_beneficiary].isAdded, "Payee must be a member to receive payment");

		ContractDetails memory _contract = ContractDetails(
			sha256(
			abi.encodePacked(block.timestamp)), 
			msg.sender, 
			_arbiter, 
			_beneficiary, 
			msg.value, 
			false, 
			true
		);
		
		
		members[msg.sender].depositorContracts.push(_contract);
		members[_arbiter].arbiterContracts.push(_contract);
		members[_beneficiary].beneficiaryContracts.push(_contract);
		
	}

	event Approved(bytes32 contractId, uint amount);

	function approve(bytes32 _id) external {
		require(abi.encodePacked(_id).length == 32, "Must pass in a valid contract index");
		ContractDetails memory _contract;
		uint arrayIndex;
		
		for (uint i = 0; i < members[msg.sender].arbiterContracts.length; i++) {
			if (members[msg.sender].arbiterContracts[i].contractId == _id) {
				_contract = members[msg.sender].arbiterContracts[i];
				arrayIndex = i;
			}
		}

		require(msg.sender == _contract.arbiter, "Only the arbiter can approve this transaction");
		
		(bool sent, ) = payable(_contract.beneficiary).call{value: _contract.amount}("");
 		require(sent, "Failed to send Ether");
		members[msg.sender].arbiterContracts[arrayIndex].isApproved = true;
		emit Approved(_id, _contract.amount);
	}

	
	//With this implementation currently cannot search by contractId

	// function getContractById(uint _id) external view returns (ContractDetails memory _contract) {
	// 	for (uint i = 0; i < contractsArray.length; i++) {
	// 		if (contractsArray[i].contractId == _id) _contract = contractsArray[i];
	// 	}
	// }

}
