import { TransactionReceipt, TokenMintTransaction } from "@hashgraph/sdk";

export default async function MintTokenTransaction(
  values,
  signingAcct,
  sendTransaction,
) {
  let trans = await new TokenMintTransaction()
    .setTokenId(values.tokenId)
    .setAmount(values.amount);

  let res = await sendTransaction(trans, signingAcct);

  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };

  if (res.success)
    responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}
