import { ConfigProvider, theme, App } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Loading } from "./components";
import { persistor } from "./store/redux";
import { AuthProvider } from "./contexts";
import Routes from "./routes";
import "./App.css";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // colorPrimary: "#3d7cef",
    colorPrimary: "#E95420",
  },
};

const reactQueryClient = new QueryClient();

const Application = () => {
  return (
    <HelmetProvider>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <AuthProvider>
          <QueryClientProvider client={reactQueryClient}>
            <ConfigProvider theme={themeConfig}>
              <App>
                <Router>
                  <Routes />
                </Router>
              </App>
            </ConfigProvider>
          </QueryClientProvider>
        </AuthProvider>
      </PersistGate>
    </HelmetProvider>
  );
};

export default Application;
