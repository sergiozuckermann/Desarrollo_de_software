import { ReactNode } from "react";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: {
  isAllowed: boolean,
  redirectPath?: string,
  children?: ReactNode
}) => {
  console.log("from protected route: ", isAllowed);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;