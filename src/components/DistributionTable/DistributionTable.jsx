import React, {useMemo} from "react";
import {Table} from "@evercityecosystem/evercity-ui";

const Summary = (pageData) => {
  const totalAmount = useMemo(() => pageData.reduce((sum, record) => {
    sum += record.amount;
    return sum;
  },0),[pageData]);

  return (<Table.Summary>
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={3}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>100</Table.Summary.Cell>
      <Table.Summary.Cell index={4}>{totalAmount}</Table.Summary.Cell>
    </Table.Summary.Row>
  </Table.Summary>);
};

const columns = [
  {
    title: "",
    render(value, record, number) {
      return number + 1
    }
  },
  {
    title: "Recipient name",
    dataIndex: "name"
  },
  {
    title: "Recipient address",
    dataIndex: "address"
  },
  {
    title: "Distribution, %",
    dataIndex: "percentage"
  },
  {
    title: "Distribution amount, (tCo2e)",
    dataIndex: "amount"
  },
];


const dataSource = [
  {
    name: "Evercity",
    address: "0.0.48651062",
    percentage: 10,
    amount: 1000
  },
  {
    name: "Sercarbono",
    address: "0.0.48651062",
    percentage: 5,
    amount: 500
  }
]
const DistributionTable = () => {
  return (<Table
    columns={columns}
    summary={Summary}
    dataSource={dataSource}
  />)
};

export default DistributionTable;
