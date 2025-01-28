import { FC, useState } from "react";
import { classNames } from "../../utils";
import { ReadMoreProps } from "../../types";

export const ReadMore: FC<ReadMoreProps> = (props) => {
  const { children, className = "", limitTextLength, ...others } = props;

  const [isReadingMore, setIsReadingMore] = useState(false);

  const content = isReadingMore ? children : children.slice(0, limitTextLength);

  return (
    <span {...others} className={classNames(className, "inline-block")}>
      {content}

      <button
        onClick={() => setIsReadingMore((prev) => !prev)}
        className="font-medium italic hover:brightness-75 transition duration-300"
      >
        {!isReadingMore && children.length > limitTextLength && "... See more"}
        {isReadingMore && <>&nbsp; Show less</>}
      </button>
    </span>
  );
};
