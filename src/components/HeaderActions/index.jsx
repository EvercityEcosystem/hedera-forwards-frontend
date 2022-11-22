import React from "react";
import { Button } from "@evercityecosystem/evercity-ui";
import { useHashConnect } from "../../hooks/useHashconnect.jsx";

const HeaderActions = () => {
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
    network,
    pairingString,
    sendTransaction,
  } = useHashConnect();
  return (
    <>
      {pairingData?.accountIds}
      {pairingData == null ? (
        <Button onClick={connectToExtension}>Connect</Button>
      ) : (
        <Button onClick={disconnect}>Disconnect</Button>
      )}
    </>
  );
};

export default HeaderActions;
