import { NotifyParams } from "../types";
import { toastFuncMap, toastOptions } from "../configs";

export const useNotification = () => {
  const notify = ({ description, variant = "success" }: NotifyParams) => {
    const toastFunc = toastFuncMap[variant];

    toastFunc(
      <div className="flex flex-col gap-2 text-sm ">
        <span className="text-onNeurtralBg">{description}</span>
      </div>,
      toastOptions
    );
  };

  return [notify];
};
