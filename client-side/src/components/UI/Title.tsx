import { FC } from "react";
import { fontSizes } from "../../data";
import { TitleProps } from "../../types";
import { classNames } from "../../utils";

export const Title: FC<TitleProps> = (props) => {
  const { name, desc, type, divider = true, className, color } = props;

  const fontType = fontSizes[type] || "";

  return (
    <div
    // className="flex flex-col gap-3 mb-6"
    >
      <div className="flex_justify_between">
        <h2
          className={classNames(
            "font-semibold",
            fontType,
            color === "primary" ? "text-primary" : "text-onNeutralBg",
            className
          )}
        >
          {name}
        </h2>
      </div>
      {desc && (
        <p className="-mt-2 text-sm font-normal tracking-wider text-secondary">
          {desc || "Top picks for you. Updated daily."}
        </p>
      )}
      {divider && <div className="w-full h-[1px] bg-divider" />}
    </div>
  );
};
