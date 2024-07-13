import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const lightTheme = createTheme({
  fontFamily: "Open Sans, sans-serif",
});

const darkTheme = createTheme({
  fontFamily: "Open Sans, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={lightTheme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
