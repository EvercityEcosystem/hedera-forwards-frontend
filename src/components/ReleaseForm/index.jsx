import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
} from "@evercityecosystem/evercity-ui";

const ReleaseForm = ({ onSubmit }) => (
  <Form onFinish={onSubmit} layout="vertical">
    <Form.Item required label="Project Name" name="projectName">
      <Input />
    </Form.Item>
    <Form.Item required label="Project Type" name="projectType">
      <Input />
    </Form.Item>
    <Form.Item required label="Country" name="country">
      <Input />
    </Form.Item>
    <Form.Item required label="Standard" name="standard">
      <Input />
    </Form.Item>
    <Form.Item required label="Validation Date" name="validationDate">
      <DatePicker />
    </Form.Item>
    <Form.Item required label="Registration Date" name="registrationDate">
      <DatePicker />
    </Form.Item>
    <Form.Item required label="Projected Execution Date" name="executionDate">
      <DatePicker />
    </Form.Item>
    <Form.Item
      required
      label="Sustainable Development Goals"
      name="sustainableDevelopmentGoals"
    >
      <Input />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default ReleaseForm;
