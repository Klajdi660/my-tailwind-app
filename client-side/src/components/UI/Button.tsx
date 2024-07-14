import { forwardRef, FunctionComponent, Ref } from "react";
import { Icon } from "./Icon";
import { ButtonProps } from "../../types";
import { classNames } from "../../utils";

export const Button: FunctionComponent<ButtonProps> = forwardRef(
  (
    {
      type,
      label,
      disabled,
      className,
      variant,
      labelIcon,
      // isSubmitting,
      onClick,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classNames(
          variant === "none" && "text-primary hover:bg-primary-opacity",
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
        // disabled={disabled || isSubmitting}
        disabled={disabled}
        type={type}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {/* {!isSubmitting ? ( */}
        <div className="flex flex-row items-center justify-center gap-2">
          {labelIcon && (
            // <div className="mr-2">
            <Icon
              name={labelIcon}
              className={classNames(
                variant === "none" && "text-primary",
                variant === "outlined" && "text-primary",
                variant === "contained" && "text-white",
                variant === "delete" && "text-white",
                variant === "filled" && "text-white",
                variant === "gradient" && "text-white"
              )}
            />
            // </div>
          )}
          <div className="text-center whitespace-nowrap">{label}</div>
        </div>
        {/* ) : (
           <div>Loading..</div>
       )} */}
      </button>
    );
  }
);

// label - w-full
Button.displayName = "Button";
