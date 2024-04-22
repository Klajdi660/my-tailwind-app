// import { FunctionComponent, ReactNode } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks";
// import { Modal } from "antd";

// interface PrivateGuardProps {
//   children: ReactNode;
// }

// const InfoModal = () => {
//   const navigate = useNavigate();

//   const handleOk = () => {
//     navigate("/");
//   };

//   Modal.error({
//     title: "Session Expired!",
//     content: (
//       <div>
//         <p>Your session has expired! Please sign in again.</p>
//       </div>
//     ),
//     okButtonProps: {
//       style: {
//         backgroundColor: "#0077B5",
//         color: "#fff",
//       },
//     },
//     onOk: handleOk,
//   });
// };

// const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({ children }) => {
//   const location = useLocation();
//   const { isAuthenticated } = useAuth();
//   const token = localStorage.atoken;

//   if (!isAuthenticated) {
//      return <Navigate to="/login" state={{ from: location }} />;
//      InfoModal();
//   }
//    if (!token) {
//     return <Navigate to="/login" state={{ from: location }} />;
//     InfoModal();
//   }
//   return <>{children}</>;
// };

// export default PrivateGuard;

import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { /*Navigate,*/ useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Modal } from "antd";
import dayjs from "dayjs";

interface PrivateGuardProps {
  children: ReactNode;
}

const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const currentTime = dayjs().unix();
  //   const tokenExpirationTime = localStorage.exp;
  
  //   if (currentTime > tokenExpirationTime) {
  //     setShowModal(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

export default PrivateGuard;
