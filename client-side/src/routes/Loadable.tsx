import { FunctionComponent, Suspense } from "react";
import { Loading } from "../components";

export const Loadable = (Component: FunctionComponent) => (props: object) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
