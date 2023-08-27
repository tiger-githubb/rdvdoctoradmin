import React, { Fragment, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";
// component props interface
interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {
  //// UNCOMMNET BELOW CODE IF YOU WANT TO HIDE AUTH PAGES TO AUTHENTICATED USERS

 const { isAuthenticated } = useAuth();

   if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
    }

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
