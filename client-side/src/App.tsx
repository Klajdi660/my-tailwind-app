import { Provider } from "react-redux";
import { ConfigProvider, App } from "antd";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "./routes";
import { queryClient } from "./client";
import { TabTitle } from "./components";
import { appThemeConfig } from "./configs";
import { persistor, store } from "./store";
import { AuthProvider, StoreProvider } from "./contexts";
import { ScrollProvider, StylesProvider } from "./providers";

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

const Application = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <StoreProvider>
                <ConfigProvider theme={appThemeConfig}>
                  <BrowserRouter>
                    <App>
                      <TabTitle />
                      <StylesProvider />
                      <ToastContainer />
                      <ScrollProvider>
                        <Router />
                      </ScrollProvider>
                    </App>
                  </BrowserRouter>
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
