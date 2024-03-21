import { forwardRef, FunctionComponent, Ref } from "react";
import { classNames } from "../../lib";
import { Icon } from "./Icon";

interface IconButtonProps {
  type?: "button" | "submit" | "reset";
  name?: string | any;
  size?: number;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

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
          "h-10 w-10 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 duration-300 ease-linear outline-none hover:scale-[1.1] transition-all ",
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
