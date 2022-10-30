import React from "react";
import { Form, Input, Switch } from "antd";

const FormApproveAllowance = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="Token Id" name="tokenId">
        <Input />
      </Form.Item>
      <Form.Item required label="Client Id" name="accountId">
        <Input />
      </Form.Item>
      <Form.Item required label="Amount" name="amount">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormApproveAllowance;
