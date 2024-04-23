import { ConfigProvider, theme, App } from "antd";
import { BrowserRouter as Router /*RouterProvider*/ } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Loading } from "./components";
import { AuthProvider, StoreProvider } from "./contexts";
import { StylesProvider } from "./providers";
import { Routes } from "./routes";
// import { router } from "./routes";
import { persistor, store } from "./store";
import "./index.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#0077B5",
  },
};

const reactQueryClient = new QueryClient();

const Application = () => {
  return (
    <HelmetProvider>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AuthProvider>
          <QueryClientProvider client={reactQueryClient}>
            <Provider store={store}>
              <StoreProvider>
                <ConfigProvider theme={themeConfig}>
                  <App>
                    <StylesProvider />
                    <ToastContainer />
                    <Router>
                      <Routes />
                    </Router>
                    {/* <RouterProvider router={router} /> */}
                  </App>
                </ConfigProvider>
              </StoreProvider>
            </Provider>
          </QueryClientProvider>
        </AuthProvider>
      </PersistGate>
    </HelmetProvider>
  );
};

export default Application;
