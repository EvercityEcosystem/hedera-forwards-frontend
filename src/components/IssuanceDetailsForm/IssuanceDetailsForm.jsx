import React from "react";
import {
  Form,
  InputNumber,
  DatePicker,
  Button,
  RadioGroup,
} from "@evercityecosystem/evercity-ui";

const IssuanceDetailsForm = ({ onSubmit }) => (
  <Form onFinish={onSubmit} layout="vertical">
    <Form.Item
      label="Total carbon amount to be issued"
      name="totalCarbonAmount"
      rules={[
        { required: true, message: "Required field" },
        { type: "number", min: 1 },
      ]}
    >
      <InputNumber controls={false} />
    </Form.Item>
    <Form.Item
      label="Crediting period"
      name="creditingPeriod"
      rules={[{ required: true, message: "Required field" }]}
    >
      <DatePicker.RangePicker picker="year" />
    </Form.Item>
    <Form.Item
      label="Verification period quarter"
      rules={[{ required: true, message: "Required field" }]}
      name="verificationQuarter"
    >
      <RadioGroup options={["Q1", "Q2", "Q3", "Q4"]} optionType="button" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" type="primary">
        Ok
      </Button>
    </Form.Item>
  </Form>
);

export default IssuanceDetailsForm;
