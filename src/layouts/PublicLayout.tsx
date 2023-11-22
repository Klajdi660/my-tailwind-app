import { Layout } from "antd";

interface Props {
  children?: React.ReactNode,
};

export const PublicLayout = ({
  children,
  ...restProps
}: Props): JSX.Element => {
  return (
    <Layout style={{ height: "100vh" }} className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      {children}
    </Layout>
  );
};

export default PublicLayout;
