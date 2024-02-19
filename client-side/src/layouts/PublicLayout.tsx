import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout: FunctionComponent = () => {
  return (
    <div className="auth_page">
      {/* <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
        <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded"> */}
          <Outlet />
        {/* </div>
      </div> */}
    </div>
  );
};
