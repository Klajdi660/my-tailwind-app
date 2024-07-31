import { Tooltip } from "antd";
import { forwardRef, FunctionComponent, Ref } from "react";
import { Icon } from "./Icon";
import { ButtonProps } from "../../types";
import { classNames, useSubmitting } from "../../utils";

export const Button: FunctionComponent<ButtonProps> = forwardRef(
  (
    {
      type,
      size,
      label,
      variant,
      disabled,
      className,
      labelIcon,
      tooltipTitle,
      iconClassName,
      onClick,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { isSubmitting } = useSubmitting();

    return (
      <button
        className={classNames(
          // variant === "none" && "text-primary hover:bg-primary-opacity",
          variant === "none" && className,
          variant === "outlined" &&
            "border border-primary text-primary hover:bg-primary-opacity",
          variant === "delete" && "bg-red-500 text-white hover:brightness-110",
          variant === "contained" &&
            "bg-primary text-white hover:brightness-110",
          variant === "gradient" &&
            "bg-gradient-to-r from-button_gradient_from to-button_gradient_to text-white",
          "rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none",
          className
        )}
        disabled={disabled || isSubmitting}
        // disabled={disabled}
        type={type}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {!isSubmitting ? (
          <Tooltip arrow={false} title={tooltipTitle} trigger={["hover"]}>
            <div className="flex flex-row items-center justify-center gap-2">
              {labelIcon && (
                <Icon
                  name={labelIcon}
                  className={classNames(
                    variant === "none" && iconClassName,
                    variant === "outlined" && "text-primary",
                    variant === "contained" && "text-white",
                    variant === "delete" && "text-white",
                    variant === "filled" && "text-white",
                    variant === "gradient" && "text-white"
                  )}
                  size={size}
                />
              )}
              {label && (
                <div className="text-center whitespace-nowrap">{label}</div>
              )}
            </div>
          </Tooltip>
        ) : (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
