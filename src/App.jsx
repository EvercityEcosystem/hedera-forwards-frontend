import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Popconfirm, Space, Modal, Form, Descriptions } from "antd";
import React from "react";
import { useHashConnect } from "./hooks/useHashconnect";
import FormCreateToken from "./components/CreateToken/FormCreateToken";
import CreateTokenTransaction from "./components/CreateToken/createTokenTransaction";
import FormKycToken from "./components/Kyc/FormKycToken";
import GrantKycTokenTransaction from "./components/Kyc/grantKycTokenTransaction";
import FormMintToken from "./components/Mint/FormMintToken";
import MintTokenTransaction from "./components/Mint/mintTokenTransaction";
import FormTransferToken from "./components/Transfer/FormTransferToken";
import TransferTokenTransaction from "./components/Transfer/transferTokenTransaction";
import FormWipeToken from "./components/Wipe/FormWipeToken";
import WipeTokenTransaction from "./components/Wipe/wipeTokenTransaction";
import FormAssocciateToken from "./components/Assocciate/FormAssocciateToken";
import AssocciateTokenTransaction from "./components/Assocciate/associateTokenTransaction";
import FormApproveAllowance from "./components/ApproveAllowance/FormApproveAllowance";
import ApproveAllowanceTransaction from "./components/ApproveAllowance/approveAllowanceTokenTransaction";

function App() {
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
    network,
    pairingString,
    sendTransaction,
  } = useHashConnect();
  console.log("🚀 ~ file: App.jsx ~ line 40 ~ App ~ pairingData", pairingData);
  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const createToken = async () => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: "Create Token",
      content: (
        <FormCreateToken
          form={formCreate}
          onSubmit={(values) => {
            console.log(values);
            CreateTokenTransaction(
              values,
              pairingData.accountIds[0],
              sendTransaction,
            );
          }}
        />
      ),
    });
  };

  const handle = async (title, content) => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: title,
      content: content,
    });
  };

  const handleKyc = () =>
    handle(
      "Grant Kyc",
      <FormKycToken
        form={formCreate}
        onSubmit={(values) =>
          GrantKycTokenTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );
  const handleMint = () =>
    handle(
      "Mint Token",
      <FormMintToken
        form={formCreate}
        onSubmit={(values) =>
          MintTokenTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );
  const handleSend = () =>
    handle(
      "Transfer Token",
      <FormTransferToken
        form={formCreate}
        onSubmit={(values) =>
          TransferTokenTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );
  const handleWipe = () =>
    handle(
      "Wipe Token From",
      <FormWipeToken
        form={formCreate}
        onSubmit={(values) =>
          WipeTokenTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );

  const handleAssociate = () =>
    handle(
      "Associate Token",
      <FormAssocciateToken
        form={formCreate}
        onSubmit={(values) =>
          AssocciateTokenTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );
  const handleApproveAllowance = () =>
    handle(
      "Approve Allowance Token",
      <FormApproveAllowance
        form={formCreate}
        onSubmit={(values) =>
          ApproveAllowanceTransaction(
            values,
            pairingData.accountIds[0],
            sendTransaction,
          )
        }
      />,
    );

  useEffect(() => {}, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {pairingData != null && (
        <Descriptions title="HashPack Connection Info">
          <Descriptions.Item label="Network">{network}</Descriptions.Item>
          <Descriptions.Item label="Account Ids">
            {pairingData.accountIds}
          </Descriptions.Item>
          <Descriptions.Item label="Encryption Key">
            {pairingData.encryptionKey}
          </Descriptions.Item>
        </Descriptions>
      )}

      {contextHolder}
      <Button
        disabled={pairingData != null}
        type="primary"
        onClick={connectToExtension}
      >
        Connect HashPack
      </Button>
      <Button
        disabled={pairingData == null}
        type="primary"
        onClick={disconnect}
      >
        Disconnect HashPack
      </Button>
      <h2>for Evercity</h2>
      <Button disabled={pairingData == null} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleKyc}>
        Grant KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleSend}>
        Send Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleWipe}>
        Wipe Token
      </Button>
      <span></span>
      <h2>for Client</h2>
      <Button disabled={pairingData == null} onClick={handleAssociate}>
        Associate Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleApproveAllowance}>
        Approve Allowance For Token
      </Button>
      {/* <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </Popconfirm> */}
    </Space>
  );
}

export default App;
