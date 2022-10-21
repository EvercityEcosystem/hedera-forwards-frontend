import {
  TransactionReceipt,
  TransferTransaction,
} from "@hashgraph/sdk";


export default async function TransferTokenTransaction(values, signingAcct, sendTransaction) {

  let trans = await new TransferTransaction()
  .addTokenTransfer(values.tokenId, signingAcct, -values.amount)
  .addTokenTransfer(values.tokenId, values.accountId, values.amount);


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