import React, {useState} from "react";
import { ContentLayout, Modal, Space, Button, Title, Form } from "@evercityecosystem/evercity-ui";
import styles from "./Issuance.module.less";
import IssuanceDetailsTable from "../../components/IssuanceDetailsTable/IssuanceDetailsTable";
import IssuanceDetailsForm from "../../components/IssuanceDetailsForm/IssuanceDetailsForm.jsx";
import ReleaseForm from "../../components/ReleaseForm/index.jsx";
import {useHashConnect} from "../../hooks/useHashconnect.jsx";
import CreateTokenTransaction from "./createTokenTransaction.js";
import {nanoid} from "nanoid";


const Issuance = () => {
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
  const [visibleReleaseModal, setVisibleReleaseModal] = useState(false);
  const {
    pairingData,
    sendTransaction,
  } = useHashConnect();
  const [form] = Form.useForm();
  const handleEdit = () => {
    setVisibleDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setVisibleDetailsModal(false);
  };

  const handleCloseReleaseModal = () => {
    setVisibleReleaseModal(false);
  };

  const handleRelease = () => {
    setVisibleReleaseModal(true);
  };

  const handleDetailsSubmit = ({ vintageQuantity, totalCarbonAmount, creditingPeriod }) => {
    setVisibleDetailsModal(false);
    const oldIssuances = form.getFieldValue("issuances");
    form.setFieldsValue({
      issuances: oldIssuances ? oldIssuances.slice(0, vintageQuantity) : new Array(vintageQuantity).fill({
        id: nanoid()
      }),
      totalCarbonAmount,
      creditingPeriod
    });
  };

  const handleReleaseSubmit = async (commonInfo) => {
    const issuances = form.getFieldValue("issuances");
    const transactions = issuances.filter(issuance => issuance.haveForwardsIssuance).map((issuance) => new Promise(async (resolve) => {
      const responseTransaction = await CreateTokenTransaction(
        {
          ...commonInfo,
          vintage: issuance.vintage.year(),
          supply: issuance.carbonAmount * issuance.forwardsPercentage / 100
        },
        pairingData.accountIds[0],
        sendTransaction,
      );
      resolve([issuance.id, responseTransaction]);
    }));

    const responses = await Promise.all(transactions);

    form.setFieldsValue({
      issuances: issuances.map((issuance) => {
        const receipt = responses.find(([id]) => id === issuance.id)[1]?.receipt;
        if(receipt) {
          return ({
            ...issuance,
            tokenId: receipt.tokenId.toString(),
          });
        }
        return ({...issuance});
      })
    });
    setVisibleReleaseModal(false);
  };

  return(<ContentLayout gaps="small-symmetrical">
    <Space justifyContent="end" block className={styles.toolbar}>
      <Button type="primary" onClick={handleEdit}>
        Edit
      </Button>
    </Space>
    <Form form={form}>
      <Form.List name="issuances">
        {(issuances) => <IssuanceDetailsTable
          issuances={issuances}
        />}
      </Form.List>
    </Form>
    <Space justifyContent="end" block className={styles.toolbar}>
      <Button type="primary" onClick={handleRelease}>
        Release
      </Button>
    </Space>
    <Modal
      footer={null}
      title="Edit"
      onCancel={handleCloseDetailsModal}
      visible={visibleDetailsModal}
    >
      <IssuanceDetailsForm onSubmit={handleDetailsSubmit} />
    </Modal>
    <Modal
      footer={null}
      title="Release"
      onCancel={handleCloseReleaseModal}
      visible={visibleReleaseModal}
    >
      <ReleaseForm onSubmit={handleReleaseSubmit} />
    </Modal>
  </ContentLayout>);
};

export default Issuance;
