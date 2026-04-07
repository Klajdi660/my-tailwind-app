import { FC } from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout: FC = () => {
  return (
    <div
      id="public_section"
      className="relative flex flex-col min-h-[100dvh] overflow-x-hidden text-onNeutralBg bg-main antialiased"
    >
      <Outlet />
    </div>
  );
};
