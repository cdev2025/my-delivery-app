import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      {/* 모든 페이지 상단에 Header 공통 적용*/}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
