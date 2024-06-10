import { forwardRef, FunctionComponent, Ref } from "react";
import { Icon } from "./Icon";
import { IconButtonProps } from "../../types";
import { classNames } from "../../utils";

export const IconButton: FunctionComponent<IconButtonProps> = forwardRef(
  (
    {
      type = "button",
      name,
      size,
      className,
      iconClassName,
      disabled,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        type={type}
        className={classNames(
          "rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 duration-300 ease-linear outline-none hover:scale-[1.1] transition-all ",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Icon name={name} size={size} className={iconClassName} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
// w-10 h-10
