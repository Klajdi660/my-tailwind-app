import { FC, forwardRef, Ref } from "react";
import { Icon } from "./Icon";
import { classNames } from "../../utils";
import { IconButtonProps } from "../../types";

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    {
      name,
      size,
      disabled,
      className,
      iconClassName,
      type = "button",
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        type={type}
        className={classNames(
          "rounded-full flex_justify_center disabled:cursor-not-allowed disabled:opacity-50 duration-300 ease-linear outline-none transition-all",
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
