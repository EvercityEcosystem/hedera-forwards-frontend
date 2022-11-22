import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, NavLink} from "react-router-dom";
import { UIProvider } from "@evercityecosystem/evercity-ui";
import "antd/dist/antd.css";
import "@evercityecosystem/evercity-ui/dist/style.css";

import App from "./App";
import HashConnectAPIProvider from "./hooks/useHashconnect";

const NavLinkBehavior = React.forwardRef((props, ref) => <NavLink ref={ref} {...props} />);
const uiconfig = {
  components: {
    NavLink: NavLinkBehavior
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <UIProvider config={uiconfig}>
          <HashConnectAPIProvider
            network={import.meta.env.VITE_NETWORK}
            debug={import.meta.env.VITE_DEBUG}
          >
            <App />
          </HashConnectAPIProvider>
        </UIProvider>
      </BrowserRouter>
  </React.StrictMode>
);
