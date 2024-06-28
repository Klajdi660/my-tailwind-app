import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
// import { useAuth } from "../hooks";
import { ProviderProps } from "../types";
import { isATokenExpired } from "../utils";

export const PrivateGuard: FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkATokenExpiry = () => {
      if (isATokenExpired()) {
        setShowModal(true);
      }
    };

    checkATokenExpiry();

    // Check token expiration every time localStorage.exp changes
    const interval = setInterval(checkATokenExpiry, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOk = () => {
    setShowModal(false);
    delete localStorage.atoken;
    delete localStorage.user;
    delete localStorage.exp;
    navigate("/");
  };

  return (
    <>
      {children}
      <Modal
        title="Session Expired!"
        open={showModal}
        cancelButtonProps={{ style: { display: "none" } }} // hide cancel button
        closable={false} // hide x button
        onOk={handleOk}
        okButtonProps={{
          style: {
            backgroundColor: "#0077B5",
            color: "#fff",
          },
        }}
      >
        <p>Your session has expired! Please sign in again.</p>
      </Modal>
    </>
  );
};
