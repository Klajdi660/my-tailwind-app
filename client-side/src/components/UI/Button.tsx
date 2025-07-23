import { Tooltip } from "antd";
import { FC, forwardRef, Ref } from "react";
import { Icon, Spinner } from "../../components";
import { classNames } from "../../utils";
import { ButtonProps } from "../../types";
import { useStore } from "../../hooks";

export const Button: FC<ButtonProps> = forwardRef(
  (
    {
      size,
      label,
      variant,
      onClick,
      disabled,
      className,
      labelIcon,
      isSubmitting,
      tooltipTitle,
      iconClassName,
      type = "button",
      labelIconClassName = "flex-row gap-2",
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { loading } = useStore();

    return (
      <button
        className={classNames(
          variant === "none" && className,
          variant === "outlined" &&
            "border border-primary text-primary hover:bg-primary-opacity",
          variant === "delete" && "bg-red-500 text-white hover:brightness-110",
          variant === "contained" &&
            "bg-primary text-white hover:brightness-110",
          variant === "gradient" &&
            "bg-gradient-to-r from-button_gradient_from to-button_gradient_to text-white",
          "rounded font-semibold text-sm p-3 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none",
          className
        )}
        disabled={disabled}
        type={type}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {loading && isSubmitting ? (
          <Spinner />
        ) : (
          <Tooltip arrow={false} title={tooltipTitle} trigger={["hover"]}>
            <div
              className={classNames("flex_justify_center", labelIconClassName)}
            >
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
                <div className="text-center font-normal whitespace-nowrap">
                  {label}
                </div>
              )}
            </div>
          </Tooltip>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
