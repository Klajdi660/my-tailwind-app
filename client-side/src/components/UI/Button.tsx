import { forwardRef, FunctionComponent, Ref } from "react";
import { classNames } from "../../utils"; 
import { Icons } from "./Icon";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  disabled?: boolean;
  className?: string;
  variant: "outlined" | "contained" | "gradient" | "filled";
  labelIcon?: any;
  isSubmitting?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

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
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classNames(
          variant === "outlined" && "border border-primary text-primary",
          variant === "contained" && "bg-primary text-white",
          variant === "gradient" &&
            "bg-gradient-to-r from-button_gradient_from to-button_gradient_to text-white",
          "rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none",
          className
        )}
        disabled={disabled || isSubmitting}
        type={type}
        ref={ref}
        {...props}
      >
        {!isSubmitting ? (
          <div className="flex flex-row items-center">
            {labelIcon && (
              <div className="mr-1">
                <Icons
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
        ) : (
          <div>Loading..</div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
