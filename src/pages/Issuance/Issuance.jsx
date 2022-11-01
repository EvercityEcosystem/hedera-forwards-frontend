import React, {useState} from "react";
import { ContentLayout, Modal, Space, Button, Title, Form } from "@evercityecosystem/evercity-ui";
import styles from "./Issuance.module.less";
import IssuanceDetailsTable from "../../components/IssuanceDetailsTable/IssuanceDetailsTable";
import IssuanceDetailsForm from "../../components/IssuanceDetailsForm/IssuanceDetailsForm.jsx";


const Issuance = () => {
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);

  const [form] = Form.useForm();
  const handleEdit = () => {
    setVisibleDetailsModal(true);
  };

  const handleCloseModal = () => {
    setVisibleDetailsModal(false);
  };

  const handleSubmit = ({ vintageQuantity, totalCarbonAmount, creditingPeriod }) => {
    setVisibleDetailsModal(false);
    const oldIssuances = form.getFieldValue("issuances");
    form.setFieldsValue({
      issuances: oldIssuances ? oldIssuances.slice(0, vintageQuantity) : new Array(vintageQuantity).fill({}),
      totalCarbonAmount,
      creditingPeriod
    });
  };

  return(<ContentLayout gaps="small-symmetrical">
    <Title level={2}>Issuance details</Title>
    <Space justifyContent="end" block className={styles.toolbar}>
      <Button type="primary" onClick={handleEdit}>
        Edit
      </Button>
    </Space>
    <Modal
      footer={null}
      title="Edit"
      onCancel={handleCloseModal}
      visible={visibleDetailsModal}
    >
      <IssuanceDetailsForm onSubmit={handleSubmit} />
    </Modal>
    <Form form={form}>
      <Form.List name="issuances">
        {(issuances) => <IssuanceDetailsTable
          issuances={issuances}
        />}
      </Form.List>
    </Form>
  </ContentLayout>);
};

export default Issuance;
