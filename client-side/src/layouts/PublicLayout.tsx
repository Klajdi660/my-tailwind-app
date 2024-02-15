import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { useFormList } from "../hooks";
import { logo } from "../constants";
import { HeaderForm } from "../components/Auth/HeaderForm";

export const PublicLayout: FunctionComponent = () => {
  const { lists } = useFormList();  

  const pathname = lists[0].formName.toLowerCase();

  return (
    // <div className="auth_page">
      <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
        <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
          <div>
            <HeaderForm 
              title={lists[0].formTitle}
              logoName={logo.name}
              logoIcon={logo.icon}
              pathname={pathname}
            />
            <Outlet />
          </div>
        </div>
      </div>
    // </div>
  );
};
