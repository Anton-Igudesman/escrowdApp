import { ethers } from 'ethers';

export default function Escrow({
  contractId,
  arbiter,
  beneficiary,
  amount,
  handleApprove,
  isApproved,
  signer,
  account
}) {

  amount = ethers.utils.formatEther(amount.toString());
  
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Contract Amount (portion of Ethers) </div>
          <div>  {amount}</div>
        </li>
        {isApproved ? <div className="complete">✓ It's been approved! </div> : (<div
          className="button"
          id={contractId}
          onClick={async (e) => {
            e.preventDefault();
            console.log(e, contractId, isApproved, 'arbiter address?', arbiter, 'account', account)
            console.log('signer', await signer.getAddress());
            handleApprove(contractId);
          }}
        >
          Approve
        </div>)}
      </ul>
    </div>
  );
}
