import React from "react";
import {
  Table,
  Form,
  DatePicker,
  InputNumber,
  Switch,
  ExternalLink,
} from "@evercityecosystem/evercity-ui";

const SwitchForwardCell = ({ index, children }) => (
  <Form.Item
    noStyle
    shouldUpdate={(prevValues, curValues) =>
      prevValues.issuances[index].haveForwardsIssuance !==
      curValues.issuances[index].haveForwardsIssuance
    }
  >
    {({ getFieldValue }) =>
      getFieldValue(["issuances", index, "haveForwardsIssuance"]) && children
    }
  </Form.Item>
);

const Summary = () => (
  <Table.Summary>
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={2}>
        <Form.Item noStyle>Total</Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2} colSpan={2}>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => getFieldValue("totalCarbonAmount") || 0}
        </Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const issuances = getFieldValue("issuances");
            const totalCarbonAmount = getFieldValue("totalCarbonAmount");
            if (!totalCarbonAmount) {
              return 0;
            }
            const totalForwardAmount =
              issuances?.reduce((total, current) => {
                if (current.carbonAmount && current.forwardsPercentage) {
                  total +=
                    (current.carbonAmount * current.forwardsPercentage) / 100;
                }
                return total;
              }, 0) || 0;
            return ((totalForwardAmount / totalCarbonAmount) * 100).toFixed(2);
          }}
        </Form.Item>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} colSpan={3}>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const issuances = getFieldValue("issuances");
            return (
              issuances?.reduce((total, current) => {
                if (current.carbonAmount && current.forwardsPercentage) {
                  total +=
                    (current.carbonAmount * current.forwardsPercentage) / 100;
                }
                return total;
              }, 0) || 0
            );
          }}
        </Form.Item>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </Table.Summary>
);

const IssuanceDetailsTable = ({ issuances }) => {
  const columns = [
    {
      title: "",
      render(value, record, number) {
        return <Form.Item>{number + 1}</Form.Item>;
      },
    },
    {
      title: "Vintage, year",
      dataIndex: "vintage",
      render: (value, record, index) => (
        <Form.Item shouldUpdate>
          {({ getFieldValue }) =>
            getFieldValue(["issuances", index, "vintage"])
          }
        </Form.Item>
      ),
    },
    {
      title: "Carbon issuance amount, (tCo2e)",
      dataIndex: "carbonAmount",
      render: (value, record, index) => (
        <Form.Item name={[index, "carbonAmount"]}>
          <InputNumber defaultValue={0} controls={false} />
        </Form.Item>
      ),
    },
    {
      title: "Forwards issuance, Y/N",
      dataIndex: "haveForwardsIssuance",
      width: 170,
      render: (value, record, index) => (
        <Form.Item noStyle shouldUpdate>
          {({ setFieldsValue, getFieldValue }) => (
            <Form.Item name={[index, "haveForwardsIssuance"]}>
              <Switch
                onChange={() => {
                  const issuances = getFieldValue("issuances");
                  const updatedIssuances = issuances.map((item, i) => {
                    if (index === i) {
                      return {
                        ...item,
                        forwardsPercentage: null,
                        forwardsAmount: null,
                        forwardPrice: null,
                      };
                    }
                    return item;
                  });
                  setFieldsValue({
                    issuances: updatedIssuances,
                  });
                }}
              />
            </Form.Item>
          )}
        </Form.Item>
      ),
    },
    {
      title: "Forwards issuance, % (max 90%)",
      dataIndex: "forwardsPercentage",
      width: 170,
      render: (value, record, index) => (
        <SwitchForwardCell index={index}>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldValue }) => {
              const carbonAmount = getFieldValue([
                "issuances",
                index,
                "carbonAmount",
              ]);
              return (
                <Form.Item
                  name={[index, "forwardsPercentage"]}
                  rules={[
                    {
                      type: "number",
                      max: 90,
                      message: "Forwards issuance cannot be greater than 90",
                    },
                  ]}
                >
                  <InputNumber
                    defaultValue={0}
                    controls={false}
                    onChange={(value) => {
                      setFieldValue(
                        ["issuances", index, "forwardsAmount"],
                        (carbonAmount * value) / 100,
                      );
                    }}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </SwitchForwardCell>
      ),
    },
    {
      title: "Forwards amount, t (tCo2e)",
      dataIndex: "forwardsAmount",
      width: 170,
      render: (value, record, index) => (
        <SwitchForwardCell index={index}>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldValue }) => {
              const carbonAmount = getFieldValue([
                "issuances",
                index,
                "carbonAmount",
              ]);
              const maxForwardsAmount = carbonAmount * 0.9;
              return (
                <Form.Item
                  name={[index, "forwardsAmount"]}
                  rules={[
                    {
                      type: "number",
                      max: maxForwardsAmount,
                      message: `Forwards amount cannot be greater than ${maxForwardsAmount}`,
                    },
                  ]}
                >
                  <InputNumber
                    defaultValue={0}
                    onChange={(value) => {
                      setFieldValue(
                        ["issuances", index, "forwardsPercentage"],
                        (value / carbonAmount) * 100,
                      );
                    }}
                    controls={false}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </SwitchForwardCell>
      ),
    },
    {
      title: "Forward price, $",
      dataIndex: "forwardPrice",
      width: 170,
      render: (value, record, index) => (
        <SwitchForwardCell index={index}>
          <Form.Item name={[index, "forwardPrice"]}>
            <InputNumber defaultValue={0} controls={false} />
          </Form.Item>
        </SwitchForwardCell>
      ),
    },
    {
      title: "",
      dataIndex: "tokenId",
      width: 100,
      render(tokenId, record, index) {
        return (
          <SwitchForwardCell index={index}>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const tokenId = getFieldValue(["issuances", index, "tokenId"]);
                return (
                  <ExternalLink
                    href={`${
                      import.meta.env.VITE_EXPLORER_URL
                    }/token/${tokenId}`}
                    disabled={!tokenId}
                  >
                    Explorer
                  </ExternalLink>
                );
              }}
            </Form.Item>
          </SwitchForwardCell>
        );
      },
    },
  ];
  return <Table dataSource={issuances} columns={columns} summary={Summary} />;
};

export default IssuanceDetailsTable;
