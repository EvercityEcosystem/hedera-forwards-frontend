import React from "react";
import {Descriptions, Form, Modal, Popconfirm, Space} from "antd";
import { Button } from "@evercityecosystem/evercity-ui";
import {useHashConnect} from "../../hooks/useHashconnect.jsx";
import FormCreateToken from "../../components/CreateToken/FormCreateToken.jsx";
import CreateTokenTransaction from "../../components/CreateToken/createTokenTransaction.js";
import LkLayout from "../../components/LkLayout/LkLayout.jsx";

const Home = () => {
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
          onSubmit={(values) =>
            CreateTokenTransaction(
              values,
              pairingData.accountIds[0],
              sendTransaction
            )
          }
        />
      ),
    });
  };

  const handleKyc = async () => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: "Grant KYC",
      content: (
        <Form form={formCreate} onSubmit={(values) => values}>
          {" "}
        </Form>
      ),
    });
  };
  const handleMint = () => {};
  const handleAssociate = () => {};


  return(<LkLayout>
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
        <Button disabled={pairingData == null} onClick={createToken}>
          Create Token
        </Button>
        <Button disabled={pairingData == null} onClick={handleKyc}>
          Grant KYC
        </Button>
        <Button disabled={pairingData == null} onClick={handleMint}>
          Mint Token
        </Button>
        <Button disabled={pairingData == null} onClick={handleAssociate}>
          Associate Token
        </Button>
        <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
          <Button>Confirm</Button>
        </Popconfirm>
      </Space>
  </LkLayout>);
};

export default Home;
