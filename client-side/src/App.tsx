import { ConfigProvider, theme, App } from "antd";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Loading } from "./components";
import { persistor } from "./store/redux";
import { AuthProvider } from "./contexts";
// import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes";
import "./index.css";
import { StylesProvider } from "./providers";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // colorPrimary: "#EB6536",
    colorPrimary: "#0077B5",
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
                <StylesProvider />
                <ToastContainer
                  // position="top-right"
                  // autoClose={5000}
                  // hideProgressBar={false}
                  // newestOnTop={false}
                  // closeOnClick
                  // pauseOnFocusLoss={false}
                  // pauseOnHover={false}
                  // theme="dark"
                />
                {/* <Router>
                  <Routes />
                </Router> */}
                <RouterProvider router={router}/>
              </App>
            </ConfigProvider>
          </QueryClientProvider>
        </AuthProvider>
      </PersistGate>
    </HelmetProvider>
  );
};

export default Application;
