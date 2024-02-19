import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotifyParams {
    title: string;
    description: string;
    variant: any;
};

export const useNotification = () => {
    const toastFuncMap: any = {
        info: toast.info,
        success: toast.success,
        warning: toast.warning,
        error: toast.error,
        default: toast,
    };

    const notify = ({ title, description, variant = "success" }: NotifyParams) => {
        const toastFunc = toastFuncMap[variant] || toastFuncMap.default;
        
        toastFunc(
            <div className="flex flex-col gap-2 text-sm ">
                {/* <span className="text-onNeurtralBg">{title}</span> */}
                <span className="text-onNeurtralBg">{description}</span>
            </div>,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                // pauseOnHover: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
        );
    };
    
    return [notify];
};