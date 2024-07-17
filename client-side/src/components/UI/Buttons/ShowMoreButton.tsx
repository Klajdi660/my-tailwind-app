import { FunctionComponent } from "react";
import { classNames } from "../../../utils";
import { Icon } from "../Icon";

interface ShowMoreButtonProps {
  className?: string;
  onClick?: any;
}

export const ShowMoreButton: FunctionComponent<ShowMoreButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "flex w-4/5 items-center justify-center p-2 mt-4 gap-1 text-secondary text-sm bg-primary-opacity rounded-full group-hover:text-white group-hover:bg-primary",
        className
      )}
      {...props}
    >
      See more
      <Icon
        name="BiChevronsRight"
        className="text-secondary group-hover:text-white"
      />
    </button>
  );
};
