import React, {useMemo} from "react";
import { Table } from "@evercityecosystem/evercity-ui";

const Summary = (pageData) => {

  const total = useMemo(() => pageData.reduce((sum, record) => {
    const forwardsAmount = record.carbonAmount * record.forwardsPercentage;
    sum.carbonAmount = record.carbonAmount + (sum.carbonAmount || 0);
    sum.forwardsAmount = forwardsAmount + (sum.forwardsAmount || 0);
    return sum;
  }, {}),[pageData]);

 return(<Table.Summary>
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={2}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={2} colSpan={2}>{total.carbonAmount}</Table.Summary.Cell>
      <Table.Summary.Cell index={4}>{total.forwardsAmount / total.carbonAmount * 100}</Table.Summary.Cell>
      <Table.Summary.Cell index={5} colSpan={2}>{total.forwardsAmount}</Table.Summary.Cell>
    </Table.Summary.Row>
  </Table.Summary>)
}

const columns = [
  {
    title: "",
    render(value, record, number) {
      return number + 1
    }
  },
  {
    title: "Vintage, year",
    dataIndex: "vintage"
  },
  {
    title: "Carbon issuance amount, (tCo2e)",
    dataIndex: "carbonAmount",
  },
  {
    title: "Forwards issuance, Y/N",
    dataIndex: "haveForwardsIssuance"
  },
  {
    title: "Forwards issuance, % (max 90%)",
    dataIndex: "forwardsPercentage",
    render(value) {
      return value * 100
    }
  },
  {
    title: "Forwards amount, t (tCo2e)",
    dataIndex: "forwardsAmount",
    render(value, { carbonAmount, forwardsPercentage }) {
      return carbonAmount * forwardsPercentage
    }
  },
  {
    title: "Forward price, $",
    dataIndex: "forwardPrice"
  }
]

const dataSource = [
  {
    vintage: "2022",
    carbonAmount: 100,
    haveForwardsIssuance: "Y",
    forwardsPercentage: 0.34,
    forwardPrice: 1000
  }
]
const IssuanceDetailsTable = () => {
  return (<Table
    columns={columns}
    summary={Summary}
    dataSource={dataSource}
  />)
};

export default IssuanceDetailsTable;
