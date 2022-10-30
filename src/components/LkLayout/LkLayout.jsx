import React from "react";
import { Layout } from "@evercityecosystem/evercity-ui";
import AppSider from "../AppSider/AppSider.jsx";
import {Outlet} from "react-router-dom";

const LkLayout = () => {
  return(<Layout>
    <Layout.Header>
      actions
    </Layout.Header>
    <Layout>
      <Layout.Sider>
        <AppSider />
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>

  </Layout>);
};

export default LkLayout;
