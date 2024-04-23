import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth } from "../hooks";
import { Modal } from "antd";

interface PrivateGuardProps {
  children: ReactNode;
}

export const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated :>> ', isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    const currentTime = dayjs().unix();
    const tokenExpirationTime = localStorage.exp;

    if (currentTime > tokenExpirationTime) {
      setShowModal(true);
    }
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
