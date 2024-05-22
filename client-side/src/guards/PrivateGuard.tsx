import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "antd";
// import { useAuth } from "../hooks";
import { ProviderProps } from "../types";

export const PrivateGuard: FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const currentTime = dayjs().unix();
  //   const tokenExpirationTime = localStorage.user.exp;

  //   if (currentTime > tokenExpirationTime) {
  //     setShowModal(true);
  //   }
  // }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = dayjs().unix();
      const tokenExpirationTime = JSON.parse(localStorage.user).exp;

      if (tokenExpirationTime && currentTime > parseInt(tokenExpirationTime)) {
        setShowModal(true);
      }
    };

    checkTokenExpiration();

    // Check token expiration every time localStorage.exp changes
    const interval = setInterval(checkTokenExpiration, 1000);

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
