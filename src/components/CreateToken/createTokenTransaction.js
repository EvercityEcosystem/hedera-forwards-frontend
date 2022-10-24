import {
  PublicKey,
  TransactionReceipt,
  TokenCreateTransaction,
} from "@hashgraph/sdk";

// Token metadata
// ID - Hedera

// Project Name 
// Project Type
// Country 
// Vintage 
// Validation date
// Registration date
// Projected Execution date: Vintage year + Quarter of verification report
// Sustainable Development Goals 

// stored on backend:
// Status: issued, executed, canceled

// values  {
//   projectName
//   projectType
//   country
//   vintage
//   validationDate
//   registrationDate
//   executionDate
//   sustainableDevelopmentGoals
// }

function ConstructTokenName(values) {
  if("Forward".length+1+values.projectName.length+1+values.projectType.length+1+values.vintage.length <=100) {
    return "Forward"+"-"+values.projectName+"-"+values.projectType+"-"+values.vintage;
  } else if ("Forward".length+1+values.projectName.length+1+values.vintage.length <=100) {
    return "Forward"+"-"+values.projectName+"-"+values.vintage;
  } else {
    const excess = "Forward".length+1+values.projectName.length+1+values.vintage.length -100;
    return "Forward"+"-"+values.projectName.substring(0,values.projectName.length-excess)+"-"+values.vintage;
  }
}

function ConstructTokenSymbol(values) {
  let sym = "F"+values.projectName[0]+values.projectType[0]+values.vintage;
  return sym;
}


export default async function CreateTokenTransaction(values, signingAcct, sendTransaction) {

  let accountInfo = await window.fetch(
    "https://testnet.mirrornode.hedera.com/api/v1/accounts/" +
      signingAcct,
    { method: "GET" }
  );
  // let accountInfo:any = await window.fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/" + signingAcct, { method: "GET" });
  accountInfo = await accountInfo.json();
  let key = await PublicKey.fromString(accountInfo.key.key);
  let trans = await new TokenCreateTransaction()
    .setTokenName(ConstructTokenName(values))
    .setTokenSymbol(ConstructTokenSymbol(values))
    .setDecimals(0)
    .setInitialSupply(values.supply)
    .setTreasuryAccountId(signingAcct)
    .setAdminKey(key)
    .setSupplyKey(key)
    .setWipeKey(key)
    .setAutoRenewAccountId(signingAcct)
    .setKycKey(key);

  // TODO save data to ipfs
  const dataToIpfs =  {
      projectName: values.projectName,
      projectType: values.projectType,
      country: values.country,
      vintage: values.vintage,
      validationDate: values.validationDate,
      registrationDate: values.registrationDate,
      executionDate: values.executionDate,
      sustainableDevelopmentGoals: values.sustainableDevelopmentGoals
    }

  // should be <=100 symbols
  const ipfsLink = "EXAMPLE!!!dadadr8u3jf3o9fuje09vijd";
  trans.setTokenMemo(ipfsLink);

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