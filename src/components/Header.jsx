import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux에서 accessToken을 가져와 로그인 여부 판단
  const { accessToken } = useSelector((state) => state.auth);

  // 로그아웃 시 전역 상태 초가화 + 홈 이동
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 좌측 로고/홈버튼 */}
        <Typography variant="h6">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Delivery App
          </Link>
        </Typography>

        {/* 우측 네비게이션 메뉴 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* 스토어 목록 */}
          <Link to="/stores" style={{ textDecoration: "none" }}>
            <Button variant="text" sx={{ color: "white" }}>
              스토어
            </Button>
          </Link>

          {/* 주문 내역 */}
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <Button variant="text" sx={{ color: "white" }}>
              주문 내역
            </Button>
          </Link>

          {/* 장바구니 */}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Button variant="text" sx={{ color: "white" }}>
              장바구니
            </Button>
          </Link>

          {/* 로그인 상태별 UI 변경 */}
          {/* 로그인 안되어 있는 경우 : 로그인 버튼/ 회원가입 버튼  */}
          {!accessToken && (
            <>
              <Link to="/login">
                <Button sx={{ color: "white" }}> 로그인 </Button>
              </Link>

              <Link to="/register">
                <Button sx={{ color: "white" }}> 회원가입 </Button>
              </Link>
            </>
          )}

          {/* 로그인 되어 있는 경우 : 로그아웃 버튼 */}
          {accessToken && (
            <Button sx={{ color: "white" }} onClick={handleLogout}>
              로그아웃
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
