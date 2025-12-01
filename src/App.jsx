import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import StoreListPage from "./pages/StoreListPage";
import CartPage from "./pages/CartPage";
import StoreDetailPage from "./pages/StoreDetailPage";

function App() {
  return (
    <>
      {/* 모든 페이지 상단에 Header 공통 적용*/}
      <Header />

      <Routes>
        {/* 비로그인 사용 가능 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 로그인이 필요한 페이지 (ProtectedRoute) */}
        {/* 스토어 목록 페이지 */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <StoreListPage />
            </ProtectedRoute>
          }
        />

        {/* 스토어 상세 페이지 */}
        <Route
          path="/stores/:storeId"
          element={
            <ProtectedRoute>
              <StoreDetailPage />
            </ProtectedRoute>
          }
        />

        {/* 장바구니 페이지 */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
