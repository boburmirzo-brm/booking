import React, { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function Auth() {
  const auth = window.localStorage.getItem("user");
  const location = useLocation();
  return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default memo(Auth);
