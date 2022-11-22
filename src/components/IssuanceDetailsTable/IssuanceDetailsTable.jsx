import React from "react";
import {
  Table,
  Form,
  DatePicker,
  InputNumber,
  Switch,
  ExternalLink
} from "@evercityecosystem/evercity-ui";

const SwitchForwardCell = ({ index, children }) => <Form.Item  shouldUpdate={(prevValues, curValues) => prevValues.issuances[index].haveForwardsIssuance !== curValues.issuances[index].haveForwardsIssuance} >
  {({ getFieldValue }) => getFieldValue(["issuances", index, "haveForwardsIssuance"]) && children}
</Form.Item>

const Summary = () => (<Table.Summary>
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={2}>
        <Form.Item>Total</Form.Item></Table.Summary.Cell>
      <Table.Summary.Cell index={2} colSpan={2}>
        <Form.Item  shouldUpdate>
          {({getFieldValue}) => getFieldValue("totalCarbonAmount") || 0}
        </Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <Form.Item  shouldUpdate>
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
      <Table.Summary.Cell index={5} colSpan={3}>
        <Form.Item  shouldUpdate>
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
        <Form.Item
          name={[index, "vintage"]}
          dependencies={["issuances", "creditingPeriod"]}
          rules={[
            { type: "date", required: true, message: "Vintage is required" },
            ({ getFieldValue }) => ({
            validator(_, date) {
              if(!date) {
                return
              }
              const year = date.year();
              const usedYears = getFieldValue("issuances")?.filter((item, i) => i !== index)?.map(item => item?.vintage?.year()) || [];
              const useYear = usedYears.includes(year);
              const startYear = getFieldValue("creditingPeriod")[0].year();
              const endYear = getFieldValue("creditingPeriod")[1].year();
              if(year < startYear || year > endYear) {
                return Promise.reject(new Error(`The year must be within the period`));
              }
              if(useYear) {
                return Promise.reject(new Error(`The year has already been used`));
              }
              return Promise.resolve();
            }
          })]}
        >
            <DatePicker picker="year" />
        </Form.Item>
    },
    {
      title: "Carbon issuance amount, (tCo2e)",
      dataIndex: "carbonAmount",
      render: (value, record, index) =>
        <Form.Item  name={[index, "carbonAmount"]}>
          <InputNumber controls={false} />
        </Form.Item>
    },
    {
      title: "Forwards issuance, Y/N",
      dataIndex: "haveForwardsIssuance",
      render: (value, record, index) =>
        <Form.Item  shouldUpdate>
          {({ setFieldsValue, getFieldValue }) => <Form.Item  name={[index, "haveForwardsIssuance"]}>
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
      width: 170,
      render: (value, record, index) =>
        <SwitchForwardCell index={index}>
          <Form.Item
            name={[index, "forwardsPercentage"]}
            rules={[{ type: "number", max: 90, message: "Forwards issuance cannot be greater than 90" }]}
          >
            <InputNumber controls={false} />
          </Form.Item>
        </SwitchForwardCell>
    },
    {
      title: "Forwards amount, t (tCo2e)",
      dataIndex: "forwardsAmount",
      render: (value, record, index) =>  <SwitchForwardCell index={index}><Form.Item  shouldUpdate>
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
      width: 170,
      render: (value, record, index) =>
        <SwitchForwardCell index={index}>
          <Form.Item  name={[index, "forwardPrice"]}>
            <InputNumber controls={false} />
          </Form.Item>
        </SwitchForwardCell>
    },
    {
      title: "",
      dataIndex: "tokenId",
      render(tokenId, record, index) {
        return <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const tokenId = getFieldValue(["issuances", index, "tokenId"]);
            return <ExternalLink
              href={`${import.meta.env.VITE_EXPLORER_URL}/token/${tokenId}`}
              disabled={!tokenId}>Explorer</ExternalLink>
          }}
        </Form.Item>
      }
    }
  ];
  return (<Table
    dataSource={issuances}
    columns={columns}
    summary={Summary}
  />);
};

export default IssuanceDetailsTable;
