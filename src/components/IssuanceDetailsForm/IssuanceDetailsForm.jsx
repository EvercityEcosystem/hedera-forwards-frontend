import React from "react";
import { Form, InputNumber, DatePicker, Button } from "@evercityecosystem/evercity-ui";

const IssuanceDetailsForm = ({ onSubmit }) => <Form onFinish={onSubmit} layout="vertical">
  <Form.Item
    label="Total carbon amount to be issued"
    name="totalCarbonAmount"
    rules={[{ required: true, message: "Required field"}, { type: "number", min: 1 }]}
  >
    <InputNumber controls={false} />
  </Form.Item>
  <Form.Item
    label="Total Vintage Quantity"
    name="vintageQuantity"
    rules={[{ required: true, message: "Required field" }, { type: "number", min: 1 }]}
  >
    <InputNumber controls={false} />
  </Form.Item>
      <Form.Item label="Crediting period" name="creditingPeriod" dependencies={["vintageQuantity"]}
        rules={[
          { required: true, message: "Required field" },
          ({ getFieldValue }) => ({
            validator(_, period) {
              const startYear = period[0].year();
              const endYear = period[1].year();
              const vintageQuantity = getFieldValue("vintageQuantity");
              if (startYear + vintageQuantity - 1 <= endYear) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(`Period cannot be less than ${vintageQuantity} years`));
            },
          })]
      }
    >
      <DatePicker.RangePicker picker="year" />
  </Form.Item>
  <Form.Item label="Verification period quarter" rules={[{ required: true, message: "Required field" }]} name="verificationQuarter">
    <DatePicker picker="quarter" />
  </Form.Item>
  <Form.Item>
    <Button htmlType="submit" type="primary">
      Ok
    </Button>
  </Form.Item>
</Form>;

export default IssuanceDetailsForm;
