import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, App } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "./routes";
import { persistor, store } from "./store";
import { StylesProvider } from "./providers";
import { themeConfig } from "./utils";
import {
  AuthProvider,
  //  FormProvider,
  StoreProvider,
} from "./contexts";
import "./index.css";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { ScrollToTop } from "./components";

const queryClient = new QueryClient();

const Application = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <StoreProvider>
                <ConfigProvider theme={themeConfig}>
                  <App>
                    <StylesProvider />
                    <ToastContainer />

                    <Router>
                      <ScrollToTop>
                        {/* <FormProvider> */}
                        <Routes />
                        {/* </FormProvider> */}
                      </ScrollToTop>
                    </Router>
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
