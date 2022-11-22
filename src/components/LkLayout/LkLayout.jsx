import React from "react";
import { Layout } from "@evercityecosystem/evercity-ui";
import {Outlet, useNavigate} from "react-router-dom";
import HeaderActions from "../HeaderActions/index.jsx";
import {HomeOutlined} from "@ant-design/icons";

const LkLayout = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return(<Layout goHome={handleGoHome}>
    <Layout.Sider
      items={[
        {
          name: "Distribution",
          icon: <HomeOutlined />,
          to: "/distribution",
        }]}
    />
    <Layout>
      <Layout.Header actions={<HeaderActions/>}>

      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  </Layout>);
};

export default LkLayout;
