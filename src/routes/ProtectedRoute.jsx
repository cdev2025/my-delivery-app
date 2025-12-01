import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  // 토큰이 없으면 로그인 페이지로 강제 이동
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  //토큰이 있으면 원래 접근하려던 페이지를 정상 렌더링
  return children;
}

export default ProtectedRoute;
