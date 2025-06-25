import { FC } from "react";

export const FormDivider: FC = () => {
  return (
    <div className="flex_justify_center gap-4 divider">
      <div className="h-[1px] bg-divider flex-1" />
      <span className="text-sm text-onNeutralBg">OR</span>
      <div className="h-[1px] bg-divider flex-1" />
    </div>
  );
};
