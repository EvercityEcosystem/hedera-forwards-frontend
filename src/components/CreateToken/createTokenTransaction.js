import {
  PublicKey,
  TransactionReceipt,
  TokenCreateTransaction,
} from "@hashgraph/sdk";
import { notification } from "antd";
import { Web3Storage } from "web3.storage";

// Token metadata
// ID - Hedera

// Project Name
// Project Type
// Country
// Vintage
// Validation date
// Registration date
// Standard
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
//   standard
//   executionDate
//   sustainableDevelopmentGoals
// }

async function uploadToWeb3Storage(dataToIpfs, token_name) {
  const blob = new Blob([JSON.stringify(dataToIpfs)], {
    type: "application/json",
  });
  const file = new File([blob], `${token_name}.json`);

  const client = new Web3Storage({
    token: import.meta.env.VITE_WEB3_STORAGE_JWT,
  });

  const onRootCidReady = (cid) => {
    notification.info({
      message: `uploading to web3.storage`,
      description: `CID is ${cid} `,
    });
  };
  const cid = await client.put([file], { onRootCidReady });
  if (import.meta.env.VITE_DEBUG) console.log("stored file with cid:", cid);
  return cid;
}

function ConstructTokenName(values) {
  if (
    "Forward".length +
      1 +
      values.projectName.length +
      1 +
      values.projectType.length +
      1 +
      values.standard.length +
      1 +
      values.vintage.length <=
    100
  ) {
    return (
      "Forward" +
      "-" +
      values.projectName +
      "-" +
      values.projectType +
      "-" +
      values.standard +
      "-" +
      values.vintage
    );
  } else if (
    "Forward".length +
      1 +
      values.projectName.length +
      1 +
      values.projectType.length +
      1 +
      values.vintage.length <=
    100
  ) {
    return (
      "Forward" +
      "-" +
      values.projectName +
      "-" +
      values.projectType +
      "-" +
      values.vintage
    );
  } else if (
    "Forward".length +
      1 +
      values.projectName.length +
      1 +
      values.vintage.length <=
    100
  ) {
    return "Forward" + "-" + values.projectName + "-" + values.vintage;
  } else {
    const excess =
      "Forward".length +
      1 +
      values.projectName.length +
      1 +
      values.vintage.length -
      100;
    return (
      "Forward" +
      "-" +
      values.projectName.substring(0, values.projectName.length - excess) +
      "-" +
      values.vintage
    );
  }
}

function ConstructTokenSymbol(values) {
  return (
    "F" +
    values.projectName[0] +
    values.projectType[0] +
    values.standard[0] +
    values.vintage
  );
}

export default async function CreateTokenTransaction(
  values,
  signingAcct,
  sendTransaction,
) {
  if (import.meta.env.VITE_DEBUG)
    console.log("***************network*******************");
  if (import.meta.env.VITE_DEBUG) console.log(import.meta.env.VITE_NETWORK);

  const URL =
    import.meta.env.VITE_NETWORK == "mainnet"
      ? "https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/"
      : "https://testnet.mirrornode.hedera.com/api/v1/accounts/";
  let accountInfo = await window.fetch(URL + signingAcct, { method: "GET" });
  accountInfo = await accountInfo.json();
  let key = await PublicKey.fromString(accountInfo.key.key);
  const token_name = ConstructTokenName(values);
  let trans = await new TokenCreateTransaction()
    .setTokenName(token_name)
    .setTokenSymbol(ConstructTokenSymbol(values))
    .setDecimals(0)
    .setInitialSupply(values.supply)
    .setTreasuryAccountId(signingAcct)
    .setAdminKey(key)
    .setSupplyKey(key)
    .setWipeKey(key)
    .setAutoRenewAccountId(signingAcct)
    .setKycKey(key);

  // save data to ipfs
  let dataToIpfs = {
    projectName: values.projectName,
    projectType: values.projectType,
    country: values.country,
    vintage: values.vintage,
    validationDate: values.validationDate,
    registrationDate: values.registrationDate,
    standard: values.standard,
    executionDate: values.executionDate,
    sustainableDevelopmentGoals: values.sustainableDevelopmentGoals,
  };

  if (import.meta.env.VITE_DEBUG)
    console.log("************dataToIpfs***********");
  if (import.meta.env.VITE_DEBUG) console.log(dataToIpfs);

  // should be <=100 symbols
  const cid = await uploadToWeb3Storage(dataToIpfs, token_name);
  if (import.meta.env.VITE_DEBUG)
    console.log("***************CID*******************");
  if (import.meta.env.VITE_DEBUG) console.log(cid);
  trans.setTokenMemo(cid);

  let res = await sendTransaction(trans, signingAcct);

  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };

  if (res.success)
    responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}
