import React from "react";
import { Form, InputNumber, DatePicker, Button } from "@evercityecosystem/evercity-ui";

const IssuanceDetailsForm = ({ onSubmit }) => <Form onFinish={onSubmit} layout="vertical">
  <Form.Item label="Total carbon amount to be issued" name="totalCarbonAmount">
    <InputNumber controls={false} />
  </Form.Item>
  <Form.Item label="Total Vintage Quantity" name="vintageQuantity">
    <InputNumber controls={false} />
  </Form.Item>
  <Form.Item label="Crediting period start" name="periodStart">
    <DatePicker picker="year" />
  </Form.Item>
  <Form.Item label="Crediting period end" name="periodEnd">
    <DatePicker picker="year" />
  </Form.Item>
  <Form.Item label="Verification period quarter" name="verificationQuarter">
    <DatePicker picker="quarter" />
  </Form.Item>
  <Form.Item>
    <Button htmlType="submit" type="primary">
      Ok
    </Button>
  </Form.Item>
</Form>;

export default IssuanceDetailsForm;
