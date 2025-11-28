import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ApiService from "../api/ApiService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 입력 폼 상태
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // input 변경 핸들러
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 요청 함수
  const login = async () => {
    try {
      const response = await ApiService.post("/open-api/user/login", {
        result: {},
        body: form,
      });

      console.log("로그인 응답: ", response);

      if (!response.body) {
        alert("서버 응답 형식 오류: body 없음");
        return;
      }

      // 서버 응답에서 모든 토큰 정보 추출
      const {
        access_token,
        refresh_token,
        access_token_expired_at,
        refresh_token_expired_at,
      } = response.body;

      // Redux 전역 상태에 모든 토큰 정보 저장
      dispatch(
        loginSuccess({
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpiredAt: access_token_expired_at,
          refreshTokenExpiredAt: refresh_token_expired_at,
          user: null,
        })
      );

      // 로그인 성공 메시지 띄우고, 홈으로 이동
      alert("로그인 성공!");
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("로그인 실패: ", error);
      alert("로그인 실패");
    }
  };

  return (
    <Box>
      <Typography variant="h5">로그인</Typography>

      <TextField
        label="이메일"
        name="email"
        fullWidth
        margin="normal"
        onChange={onChange}
      />

      <TextField
        label="비밀번호"
        name="password"
        fullWidth
        margin="normal"
        onChange={onChange}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={login}>
        로그인
      </Button>
    </Box>
  );
}

export default LoginPage;
