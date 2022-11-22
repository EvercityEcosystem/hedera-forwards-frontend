import React, { useState } from "react";
import {
  ContentLayout,
  Modal,
  Space,
  Button,
  Title,
  Form,
} from "@evercityecosystem/evercity-ui";
import styles from "./Issuance.module.less";
import IssuanceDetailsTable from "../../components/IssuanceDetailsTable/IssuanceDetailsTable";
import IssuanceDetailsForm from "../../components/IssuanceDetailsForm/IssuanceDetailsForm.jsx";
import ReleaseForm from "../../components/ReleaseForm/index.jsx";
import { useHashConnect } from "../../hooks/useHashconnect.jsx";
import CreateTokenTransaction from "./createTokenTransaction.js";
import { nanoid } from "nanoid";
import { notification } from "antd";
import range from "lodash.range";

const Issuance = () => {
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
  const [visibleReleaseModal, setVisibleReleaseModal] = useState(false);
  const { pairingData, sendTransaction } = useHashConnect();
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

  const handleDetailsSubmit = ({ totalCarbonAmount, creditingPeriod }) => {
    setVisibleDetailsModal(false);
    form.setFieldsValue({
      issuances: range(
        creditingPeriod[0].year(),
        creditingPeriod[1].year() + 1,
      ).map((vintage) => ({ id: nanoid(), vintage })),
      totalCarbonAmount,
      creditingPeriod,
    });
  };

  const handleReleaseSubmit = async (commonInfo) => {
    const issuances = form.getFieldValue("issuances");
    const transactions = issuances
      .filter((issuance) => issuance.haveForwardsIssuance)
      .map((issuance) =>
        CreateTokenTransaction(
          {
            ...commonInfo,
            vintage: issuance.vintage,
            supply: issuance.forwardsAmount,
          },
          pairingData.accountIds[0],
          sendTransaction,
        ).then((responseTransaction) => [issuance.id, responseTransaction]),
      );

    try {
      const responses = await Promise.all(transactions);
      form.setFieldsValue({
        issuances: issuances.map((issuance) => {
          const receipt = responses.find(([id]) => id === issuance.id)?.[1]
            ?.receipt;
          if (receipt) {
            return {
              ...issuance,
              tokenId: receipt.tokenId.toString(),
            };
          }
          return issuance;
        }),
      });
      setVisibleReleaseModal(false);
    } catch (e) {
      notification.error({
        message: "Something went wrong.",
      });
      console.error(e);
    }
  };

  return (
    <ContentLayout gaps="small-symmetrical">
      <Space justifyContent="end" block className={styles.toolbar}>
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Space>
      <Form form={form}>
        <Form.List name="issuances">
          {(issuances) => <IssuanceDetailsTable issuances={issuances} />}
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
        open={visibleDetailsModal}
      >
        <IssuanceDetailsForm onSubmit={handleDetailsSubmit} />
      </Modal>
      <Modal
        footer={null}
        title="Release"
        onCancel={handleCloseReleaseModal}
        open={visibleReleaseModal}
      >
        <ReleaseForm onSubmit={handleReleaseSubmit} />
      </Modal>
    </ContentLayout>
  );
};

export default Issuance;
