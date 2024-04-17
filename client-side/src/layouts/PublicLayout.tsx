import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { GlobalLoading } from "../components/UI";
import { Navbar } from "../components";
import { FormListProvider } from "../contexts/FormListContext";

// export const PublicLayout: FunctionComponent = () => {
//   return (
//     <div className="auth_page">
//       <GlobalLoading />

//       <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
//         <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

interface PublicLayoutProps {
  children?: React.ReactNode;
}

export const PublicLayout = ({
  children,
  ...restProps
}: PublicLayoutProps): JSX.Element => {
  return (
    <div className="public_layout">
      <FormListProvider>
        {/* <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center"> */}
        {/* <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded"> */}
        {children}
        {/* </div> */}
        {/* </div> */}
      </FormListProvider>
    </div>
  );
};
