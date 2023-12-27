import { FunctionComponent, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

interface PublicGuardProps {
  children: ReactNode,
};

export const PublicGuard: FunctionComponent<PublicGuardProps> = ({ children }) => {
  // const location = useLocation();
  // const { isAuthenticated } = useAuth();
 
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  return <>{children}</>;
};

