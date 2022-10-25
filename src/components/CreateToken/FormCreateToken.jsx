import React from "react";
import { Form, Input, Switch } from "antd";

// Token metadata
// ID - Hedera

// Project Name
// Project Type
// Country
// Vintage
// Validation date
// Registration date
// Projected Execution date: Vintage year + Quarter of verification report
// Sustainable Development Goals

// stored on backend:
// Status: issued, executed, canceled
// Registration date - if not set

const FormCreateToken = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="Project Name" name="projectName">
        <Input />
      </Form.Item>
      <Form.Item required label="Project Type" name="projectType">
        <Input />
      </Form.Item>
      <Form.Item required label="Country" name="country">
        <Input />
      </Form.Item>
      <Form.Item required label="Vintage" name="vintage">
        <Input />
      </Form.Item>
      <Form.Item required label="Validation Date" name="validationDate">
        <Input />
      </Form.Item>
      <Form.Item required label="Registration Date" name="registrationDate">
        <Input />
      </Form.Item>
      <Form.Item required label="Standard" name="standard">
        <Input />
      </Form.Item>
      <Form.Item required label="Projected Execution Date" name="executionDate">
        <Input />
      </Form.Item>
      <Form.Item
        required
        label="Sustainable Development Goals"
        name="sustainableDevelopmentGoals"
      >
        <Input />
      </Form.Item>
      <Form.Item required label="Supply" name="supply">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCreateToken;
