import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ApiService from "../api/ApiService";
import { logout, setUser } from "../store/authSlice";

function HomePage() {
  const dispatch = useDispatch();

  // Redux에서 로그인 상태(accessToken) 읽기
  const {
    accessToken,
    refreshToken,
    accessTokenExpiredAt,
    refreshTokenExpiredAt,
    user,
  } = useSelector((state) => state.auth);

  // me API 결과 저장
  const [meInfo, setMeInfo] = useState(user);

  // me API 수동 호출
  const fetchMe = async () => {
    try {
      const res = await ApiService.get("/api/user/me");
      console.info(res.body);
      setMeInfo(res.body);
      dispatch(setUser(meInfo));
    } catch (err) {
      console.error(err);
      alert("me API 호출 실패 (로그인이 필요합니다)");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setMeInfo(null);
  };

  return (
    <Box>
      <Typography variant="h4">Home</Typography>

      {/* 비로그인 상태 */}
      {!accessToken && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ mb: 1 }}>
            로그인 후 내 정보(me)를 확인할 수 있습니다.
          </Typography>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Link to="/register">
              <Button variant="contained">회원가입</Button>
            </Link>

            <Link to="/login">
              <Button variant="outlined">로그인</Button>
            </Link>
          </Box>
        </Box>
      )}

      {/* 로그인 상태 */}
      {accessToken && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ mb: 1 }}>
            로그인 상태입니다.필요한 정보를 조회해보세요.
          </Typography>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Button variant="contained" onClick={fetchMe}>
              내 정보 조회(me)
            </Button>

            <Button variant="outlined" color="error" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        </Box>
      )}

      {/* me API 결과 렌더링 */}
      {meInfo && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">내 정보</Typography>
          <Typography>이름: {meInfo.name}</Typography>
          <Typography>이메일: {meInfo.email}</Typography>
          <Typography>주소: {meInfo.address}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
