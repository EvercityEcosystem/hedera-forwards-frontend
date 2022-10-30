import React from "react";
import { Form, InputNumber, DatePicker } from "@evercityecosystem/evercity-ui";

const IssuanceDetailsForm = () => <Form layout="vertical">
  <Form.Item label="Total carbon amount to be issued" name="carbonAmount">
    <InputNumber />
  </Form.Item>
  <Form.Item label="Total Vintage Quantity" name="vintageQuantity">
    <InputNumber />
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
</Form>;

export default IssuanceDetailsForm;
