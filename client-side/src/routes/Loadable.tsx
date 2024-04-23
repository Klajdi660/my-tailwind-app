import { FunctionComponent, Suspense } from "react";
import { Loading } from "../components";

export const Loadable = (Component: FunctionComponent<any>) => (props: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
