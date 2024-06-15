/*
 * This component is used to protect certain routes in the application.
 * It checks if the user is allowed to access the route. If not, it redirects to a specified path.
 * If the user is allowed, it renders the children components or an Outlet for nested routes.
 */
import { ReactNode } from "react";
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute component 
const ProtectedRoute = ({
  // Check if the user is allowed to access the route
  isAllowed,
  redirectPath = '/',
  children,
}: {
  // Props for the ProtectedRoute component
  isAllowed: boolean,
  redirectPath?: string,
  children?: ReactNode
}) => {
  console.log("from protected route: ", isAllowed); // Log the access status for debugging
  if (!isAllowed) {
    // If not allowed, redirect to the specified path
    return <Navigate to={redirectPath} replace />;
  }
  // If allowed, render the children components or an Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;