import {
  TransactionReceipt,
  AccountAllowanceApproveTransaction,
} from "@hashgraph/sdk";


export default async function ApproveAllowanceTransaction(values, signingAcct, sendTransaction) {

  let trans = await new AccountAllowanceApproveTransaction()
  .approveTokenAllowance(values.tokenId ,signingAcct, values.accountId, values.amount)

  let res = await sendTransaction(
    trans,
    signingAcct
  );

  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };
  
  if (res.success)
  responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}