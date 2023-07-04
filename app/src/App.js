import { ethers } from 'ethers';
import { addMember, getMember, createEscrowAgreement, approveContract, createContract } from './utils/contractFunctionality.js';
import { useEffect, useState } from 'react';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [member, setMember] = useState({});
  const [contractDeployed, setContractDeployed] = useState(false);
  const [formData, setFormData] = useState({
    arbiter: "",
    beneficiary: "",
    wei: ""
  })
 console.log('account', account, 'signer', signer);
  function handleChange( event ) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name] : event.target.value
      }
    })
  }
  //beneficiary address 0x2546BcD3c84621e976D8185a91A922aE77ECEc30
  //arbiter address 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
  //depositor address 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199

  useEffect(() => {
    console.log('member', member)
  }, [member])

  useEffect(() => {
    if (contractDeployed) {
      alert(`Escrow agreement has been created!`);
      setTimeout(() => {
        setContractDeployed(false);
      }, 3000);
    }
  })

  async function newContract(signer) {
    let beneficiary = document.getElementById('beneficiary').value;
    let arbiter = document.getElementById('arbiter').value;
    let value = ethers.BigNumber.from(document.getElementById('wei').value);

    const escrowAgreement = await createEscrowAgreement(signer, arbiter, beneficiary, value);
    const tx = await escrowAgreement.wait();
    
    if (tx) {
      setContractDeployed(true);
    } 

    formData.beneficiary = "";
    formData.wei = "";
    formData.arbiter = "";
  }

  async function getAccounts() {
    setConnected(true);
   await provider.send('eth_requestAccounts', []);
   const signerAccount = await provider.getSigner();
   setSigner(signerAccount);
   setAccount(await signerAccount.getAddress());
  }


  async function handleApprove(signer, contractId) {
    const contract = await createContract(signer);
    const tx = await contract.approve(contractId);
    console.log(tx);

    contract.on('Approved', () => {
            document.getElementById(contractId).className =
              'complete';
            document.getElementById(contractId).innerText =
              "✓ It's been approved!";
            console.log('approved');
          });
    return(tx);
  }
console.log(formData)
 return !connected ? <button onClick={getAccounts}>Connect a Wallet</button> : (
    <div className="container">
      <div className="contract">
        <h1 className="contract-header"> New Contract </h1>
        <label>
          Arbiter Address
          <input 
            type="text" 
            id="arbiter" 
            name="arbiter" 
            value={formData.arbiter} 
            onChange={(event) => handleChange(event)} 
          />
        </label>

        <label>
          Beneficiary Address
          <input 
            type="text" 
            id="beneficiary" 
            name="beneficiary" 
            value={formData.beneficiary} 
            onChange={(event => handleChange(event))}
          />
        </label>
       
        <label>
          Deposit Amount (in Wei)
          <input 
            type="text" 
            id="wei" 
            name="wei" 
            value={formData.wei}
            onChange={(event) => handleChange(event)} 
          />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={() => addMember(signer)}
        >
          Join Transaction Group
        </div>

        <div 
          className="button"
          onClick={async () => {
            setMember(await getMember(signer))
          }}
        >
          Get My Contracts
        </div>
        <div 
          className="button"
          onClick={async () => await newContract(signer)}
        >
          Create Escrow Agreement
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          <div>
            <div>My Deposited Contracts</div>
            {member && member?.depositorContracts?.length == 0 ? 'You have no deposited contracts' :
            (
              member?.depositorContracts?.map((escrow) => {
                console.log('escrow', escrow);
                return <Escrow 
                  key={escrow.contractId}
                  handleApprove={() => handleApprove(signer, escrow.contractId)} 
                  signer={signer}
                  account={account}
                  {...escrow} />;
              })
            )}
          </div>
          <div>
            <div>My Arbitration Contracts</div>
            {member && member?.arbiterContracts?.length == 0 ? 'You have no contracts to approve' :
            (
              member?.arbiterContracts?.map((escrow) => {
                console.log('escrow', escrow);
                return <Escrow 
                  key={escrow.contractId}
                  handleApprove={() => handleApprove(signer, escrow.contractId)} 
                  signer={signer}
                  account={account}
                  {...escrow} />;
              })
            )}
          </div>
          <div>
            <div>My Receivables</div>
            {member && member?.beneficiaryContracts?.length == 0 ? 'You have no receivable contracts' :
            (
              member?.beneficiaryContracts?.map((escrow) => {
                console.log('escrow', escrow);
                return <Escrow 
                  key={escrow.contractId}
                  handleApprove={() => handleApprove(signer, escrow.contractId)} 
                  signer={signer}
                  account={account}
                  {...escrow} />;
              })
            )}
          </div>
         </div>
      </div>
    </div>
  );
}

export default App;
