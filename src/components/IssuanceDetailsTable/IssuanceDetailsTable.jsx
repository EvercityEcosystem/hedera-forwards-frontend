import React from "react";
import {Table, Form, DatePicker, InputNumber, Switch } from "@evercityecosystem/evercity-ui";


const SwitchForwardCell = ({ index, children }) => <Form.Item  shouldUpdate={(prevValues, curValues) => prevValues.issuances[index].haveForwardsIssuance !== curValues.issuances[index].haveForwardsIssuance} noStyle>
  {({ getFieldValue }) => getFieldValue(["issuances", index, "haveForwardsIssuance"]) && children}
</Form.Item>

const Summary = () => (<Table.Summary>
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={2}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={2} colSpan={2}>
        <Form.Item noStyle shouldUpdate>
          {({getFieldValue}) => getFieldValue("totalCarbonAmount") || 0}
        </Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <Form.Item noStyle shouldUpdate>
          {({getFieldValue}) => {
            const issuances = getFieldValue("issuances");
            const totalCarbonAmount = getFieldValue("totalCarbonAmount");
            if(!totalCarbonAmount) {
              return 0;
            }
            const totalForwardAmount = issuances?.reduce((total, current) => {
              if(current.carbonAmount && current.forwardsPercentage) {
                total += current.carbonAmount * current.forwardsPercentage / 100;
              }
              return total;
            }, 0) || 0;
            return (totalForwardAmount / totalCarbonAmount * 100).toFixed(2);
          }}
        </Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} colSpan={2}>
        <Form.Item noStyle shouldUpdate>
          {({getFieldValue}) => {
            const issuances = getFieldValue("issuances");
            return issuances?.reduce((total, current) => {
              if(current.carbonAmount && current.forwardsPercentage) {
                total += current.carbonAmount * current.forwardsPercentage / 100;
              }
              return total;
            }, 0) || 0;
          }}
        </Form.Item>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </Table.Summary>);

const IssuanceDetailsTable = ({ issuances }) => {
  const columns = [
    {
      title: "",
      render(value, record, number) {
        return number + 1
      }
    },
    {
      title: "Vintage, year",
      dataIndex: "vintage",
      render: (value, record, index) =>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => <Form.Item noStyle name={[index, "vintage"]}>
            <DatePicker disabledDate={(current) => (current.year() < getFieldValue("periodStart").year() || current.year() > getFieldValue("periodEnd").year())} picker="year" />
          </Form.Item>}
        </Form.Item>

    },
    {
      title: "Carbon issuance amount, (tCo2e)",
      dataIndex: "carbonAmount",
      render: (value, record, index) =>
        <Form.Item noStyle name={[index, "carbonAmount"]}>
          <InputNumber controls={false} />
        </Form.Item>
    },
    {
      title: "Forwards issuance, Y/N",
      dataIndex: "haveForwardsIssuance",
      render: (value, record, index) =>
        <Form.Item noStyle shouldUpdate>
          {({ setFieldsValue, getFieldValue }) => <Form.Item noStyle name={[index, "haveForwardsIssuance"]}>
            <Switch onChange={() => {
              const issuances = getFieldValue("issuances");
              const updatedIssuances = issuances.map((item, i) => {
                if(index === i) {
                  return {
                    ...item,
                    forwardsPercentage: null,
                    forwardsAmount: null,
                    forwardPrice: null
                  }
                }
                return item;
              })
              setFieldsValue({
                issuances: updatedIssuances
              })
            }}/>
          </Form.Item>}
        </Form.Item>
    },
    {
      title: "Forwards issuance, % (max 90%)",
      dataIndex: "forwardsPercentage",
      render: (value, record, index) =>
        <SwitchForwardCell index={index}>
          <Form.Item noStyle name={[index, "forwardsPercentage"]}>
            <InputNumber controls={false} />
          </Form.Item>
        </SwitchForwardCell>
    },
    {
      title: "Forwards amount, t (tCo2e)",
      dataIndex: "forwardsAmount",
      render: (value, record, index) =>  <SwitchForwardCell index={index}><Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          const forwardsPercentage = getFieldValue(["issuances", index, "forwardsPercentage"]);
          const carbonAmount = getFieldValue(["issuances", index, "carbonAmount"]);
          if(forwardsPercentage && carbonAmount) {
            return carbonAmount * forwardsPercentage / 100
          }
           return 0;
        } }
      </Form.Item></SwitchForwardCell>
    },
    {
      title: "Forward price, $",
      dataIndex: "forwardPrice",
      render: (value, record, index) =>
        <SwitchForwardCell index={index}>
          <Form.Item noStyle name={[index, "forwardPrice"]}>
            <InputNumber controls={false} />
          </Form.Item>
        </SwitchForwardCell>
    }
  ];

  return (<Table
    dataSource={issuances}
    columns={columns}
    summary={Summary}
  />);
};

export default IssuanceDetailsTable;
