import { FC, HTMLProps, useState } from "react";
import { classNames } from "../../utils";
import { ReadMoreProps } from "../../types";

export const ReadMore: FC<ReadMoreProps & HTMLProps<HTMLSpanElement>> = (
  props
) => {
  const { children, className = "", limitTextLength, ...others } = props;

  const [isReadingMore, setIsReadingMore] = useState(false);

  const content = isReadingMore
    ? children
    : (children as string).slice(0, limitTextLength);

  return (
    <span {...others} className={classNames(className, "inline-block")}>
      {content}

      <button
        onClick={() => setIsReadingMore((prev) => !prev)}
        className="font-medium italic hover:brightness-75 transition duration-300"
      >
        {!isReadingMore &&
          (children as string).length > limitTextLength &&
          "... See more"}
        {isReadingMore && <>&nbsp; Show less</>}
      </button>
    </span>
  );
};
