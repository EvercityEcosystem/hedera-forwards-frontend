import {
  TransactionReceipt,
  TokenGrantKycTransaction,
} from "@hashgraph/sdk";


export default async function GrantKycTokenTransaction(values, signingAcct, sendTransaction) {

  let trans = await new TokenGrantKycTransaction()
  .setAccountId(values.accountId)
  .setTokenId(values.tokenId);

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