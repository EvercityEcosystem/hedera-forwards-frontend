import React from "react";
import { Layout } from "@evercityecosystem/evercity-ui";
import AppSider from "../AppSider/AppSider.jsx";

const LkLayout = ({ children }) => {
  return(<Layout>
    <Layout.Header>
      actions
    </Layout.Header>
    <Layout>
      <Layout.Sider>
        <AppSider />
      </Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
    </Layout>

  </Layout>);
};

export default LkLayout;
