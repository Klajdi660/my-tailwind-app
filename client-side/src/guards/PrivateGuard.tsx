import { FunctionComponent, ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Modal } from 'antd';
interface PrivateGuardProps {
  children: ReactNode,
};

const InfoModal = () => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/login");
  };
  
  Modal.error({
    title: "Session Expired!",
    content: (
      <div>
        <p>Your session has expired! Please sign in again.</p>
      </div>
    ),
    okButtonProps: { 
      style: {
        backgroundColor: "#0077B5",
        color: "#fff"
      },
    },
    onOk: handleOk,
  });
};

export const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  // console.log('location pg:>> ', location);
  // console.log('isAuthenticated pg:>> ', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
    // InfoModal();
  }

  return <>{children}</>;
};
