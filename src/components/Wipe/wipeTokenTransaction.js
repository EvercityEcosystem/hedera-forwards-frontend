import {
  TransactionReceipt,
  TokenWipeTransaction,
} from "@hashgraph/sdk";


export default async function WipeTokenTransaction(values, signingAcct, sendTransaction) {

  let trans = await new TokenWipeTransaction()
  .setAccountId(values.accountId)
  .setTokenId(values.tokenId)
  .setAmount(values.amount);

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