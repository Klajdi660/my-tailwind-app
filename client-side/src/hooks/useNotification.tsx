import { toast } from "react-toastify";
import { NotifyParams } from "../types";
import "react-toastify/dist/ReactToastify.css";

export const useNotification = () => {
  const toastFuncMap: any = {
    default: toast,
    info: toast.info,
    error: toast.error,
    success: toast.success,
    warning: toast.warning,
  };

  const notify = ({ description, variant = "success" }: NotifyParams) => {
    const toastFunc = toastFuncMap[variant] || toastFuncMap.default;

    toastFunc(
      <div className="flex flex-col gap-2 text-sm ">
        <span className="text-onNeurtralBg">{description}</span>
      </div>,
      {
        theme: "dark",
        // autoClose: 5000,
        draggable: true,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        position: "top-right",
        hideProgressBar: false,
        pauseOnFocusLoss: false,
      }
    );
  };

  return [notify];
};
