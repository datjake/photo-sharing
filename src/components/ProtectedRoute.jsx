import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Component bảo vệ các Route yêu cầu đăng nhập.
 * Nếu chưa đăng nhập (currentUser null), điều hướng về trang /login.
 */
const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
