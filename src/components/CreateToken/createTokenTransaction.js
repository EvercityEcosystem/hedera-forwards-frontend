import {
  PublicKey,
  TransactionReceipt,
  TokenCreateTransaction,
} from "@hashgraph/sdk";
import { notification } from "antd";
import { useCallback } from "react";

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

const PINATA_URI = "https://api.pinata.cloud";

async function pinJSONToIPFS(body) {
  const res = await fetch(`${PINATA_URI}/pinning/pinJSONToIPFS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (import.meta.env.VITE_DEBUG) console.log(data);
  if (data.error) {
    notification.error({
      message: data.error.reason,
      description: data.error.details,
    });
  }
  if (data.IpfsHash) {
    if (import.meta.env.VITE_DEBUG)
      console.log("=============pinata response data hash", data.IpfsHash);
    return data.IpfsHash;
  }
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
  // pinata cloud
  const ipfsLink = await pinJSONToIPFS(dataToIpfs);
  if (import.meta.env.VITE_DEBUG)
    console.log("***************ipfsLink*******************");
  if (import.meta.env.VITE_DEBUG) console.log(ipfsLink);
  trans.setTokenMemo(ipfsLink);

  let res = await sendTransaction(trans, signingAcct);
  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };

  if (res.success)
    responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}
