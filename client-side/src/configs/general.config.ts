import { toast, ToastContent, ToastOptions } from "react-toastify";
import { NotifyVariant } from "../types";

export const AXIOS_TIMEOUT_DURATION = 5000;
export const SOCKET_URL = "http://localhost:8080";
export const APP_URL = "http://localhost:8080";
export const APP_PREFIX = "/api";

export const toastFuncMap: Record<
  NotifyVariant,
  (content: ToastContent, options?: ToastOptions) => void
> = {
  default: toast,
  info: toast.info,
  error: toast.error,
  success: toast.success,
  warning: toast.warning,
};

export const toastOptions: ToastOptions = {
  theme: "dark",
  autoClose: 5000,
  draggable: true,
  closeOnClick: true,
  pauseOnHover: false,
  progress: undefined,
  position: "top-right",
  hideProgressBar: false,
  pauseOnFocusLoss: false,
};
