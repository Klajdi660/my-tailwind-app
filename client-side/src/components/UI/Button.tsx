import { forwardRef, FunctionComponent, Ref } from "react";
import { Icon } from "./Icon";
import { classNames } from "../../utils";
import { ButtonProps } from "../../types";

export const Button: FunctionComponent<ButtonProps> = forwardRef(
  (
    {
      type,
      label,
      disabled,
      className,
      variant,
      labelIcon,
      isSubmitting,
      // onClick,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classNames(
          variant === "outlined" && "border border-primary text-primary",
          variant === "delete" &&
            "bg-primary-opacity text-red-500 hover:bg-red-500 hover:text-white",
          // variant === "delete" && "bg-red-500 text-white hover:brightness-110",
          variant === "contained" && "bg-primary text-white",
          variant === "gradient" &&
            "bg-gradient-to-r from-button_gradient_from to-button_gradient_to text-white",
          "rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none",
          className
        )}
        disabled={disabled || isSubmitting}
        type={type}
        ref={ref}
        // onClick={onClick}
        {...props}
      >
        {/* {!isSubmitting ? ( */}
        <div className="flex flex-row items-center">
          {labelIcon && (
            <div className="mr-1">
              <Icon
                name={labelIcon}
                className={classNames(
                  variant === "contained" && "text-primary",
                  variant === "filled" && "text-white",
                  variant === "gradient" && "text-white"
                )}
              />
            </div>
          )}
          <div className="w-full text-center whitespace-nowrap">{label}</div>
        </div>
        {/* ) : (
           <div>Loading..</div>
       )} */}
      </button>
    );
  }
);

Button.displayName = "Button";
