import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import HashConnectAPIProvider from "./hooks/useHashconnect";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashConnectAPIProvider
      network={import.meta.env.VITE_NETWORK}
      debug={import.meta.env.VITE_DEBUG}
    >
      <App />
    </HashConnectAPIProvider>
  </React.StrictMode>,
);
