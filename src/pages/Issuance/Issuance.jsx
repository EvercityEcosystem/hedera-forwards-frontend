import React from "react";
import { ContentLayout } from "@evercityecosystem/evercity-ui";

import IssuanceDetailsTable from "../../components/IssuanceDetailsTable/IssuanceDetailsTable";
import IssuanceDetailsForm from "../../components/IssuanceDetailsForm/IssuanceDetailsForm.jsx";


const Issuance = () => {
  return(<ContentLayout gaps="small-symmetrical">
    <IssuanceDetailsTable />
    <IssuanceDetailsForm />
  </ContentLayout>);
};

export default Issuance;
