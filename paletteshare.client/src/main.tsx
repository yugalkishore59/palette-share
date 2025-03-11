import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
});

const auth_domain = import.meta.env.VITE_AUTH_DOMAIN || "";
const auth_client_id = import.meta.env.VITE_AUTH_CLIENT_ID || "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Auth0Provider
          domain={auth_domain}
          clientId={auth_client_id}
          authorizationParams={{
            // redirect_uri: "https://localhost:5173",
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
