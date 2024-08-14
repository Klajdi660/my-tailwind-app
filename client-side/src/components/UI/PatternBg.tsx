import { FC } from "react";
import { PatternBgProps } from "../../types";

export const PatternBg: FC<PatternBgProps> = () => {
  const gradientClass = "bg-gradient-to-l from-card to-primary";

  return (
    <>
      <div
        className={`absolute z-1 w-[210px] h-[210px] rounded-full top-[-125px] right-[-15px] opacity-20 ${gradientClass}`}
      />
      <div
        className={`absolute z-1 w-[210px] h-[210px] rounded-full top-[-85px] right-[-95px] opacity-30 ${gradientClass}`}
      />
    </>
  );
};
