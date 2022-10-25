import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import "antd/dist/antd.css";
import "@evercityecosystem/evercity-ui/dist/style.css";

import App from "./App";
import HashConnectAPIProvider from "./hooks/useHashconnect";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HashConnectAPIProvider debug={true}>
        <App />
      </HashConnectAPIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
