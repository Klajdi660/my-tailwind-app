import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme, App } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
// import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router /*RouterProvider*/ } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "./routes";
// import { router } from "./routes";
// import { Loading } from "./components";
import { persistor, store } from "./store";
import { StylesProvider } from "./providers";
import { AuthProvider, FormProvider, StoreProvider } from "./contexts";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

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
      <Provider store={store}>
        <PersistGate /*loading={<Loading />}*/ persistor={persistor}>
          <AuthProvider>
            <QueryClientProvider client={reactQueryClient}>
              <StoreProvider>
                <ConfigProvider theme={themeConfig}>
                  <App>
                    <StylesProvider />
                    <ToastContainer />
                    <Router>
                      <FormProvider>
                        <Routes />
                      </FormProvider>
                    </Router>
                    {/* <RouterProvider router={router} /> */}
                  </App>
                </ConfigProvider>
              </StoreProvider>
            </QueryClientProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};

export default Application;
