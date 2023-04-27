import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRoutes() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoutes;
