import React from "react";
import { Form, Input, Switch } from "antd";

const FormAssocciateToken = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="Token Id" name="tokenId">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormAssocciateToken;
