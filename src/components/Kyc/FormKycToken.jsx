import React from "react";
import { Form, Input, Switch } from "antd";

const FormKycToken = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="Token Id" name="tokenId">
        <Input />
      </Form.Item>
      <Form.Item required label="Client Address" name="accountId">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormKycToken;
