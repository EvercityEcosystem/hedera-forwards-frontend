import { TransactionReceipt, TokenAssociateTransaction } from "@hashgraph/sdk";

export default async function AssocciateTokenTransaction(
  values,
  signingAcct,
  sendTransaction,
) {
  let trans = await new TokenAssociateTransaction()
    .setAccountId(signingAcct)
    .setTokenIds([values.tokenId]);

  let res = await sendTransaction(trans, signingAcct);

  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };

  if (res.success)
    responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}
