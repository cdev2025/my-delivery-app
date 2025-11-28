import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ApiService from "../api/ApiService";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  //입력값 업데이트
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 회원 가입 요청
  const register = async () => {
    try {
      const response = await ApiService.post("/open-api/user/register", {
        result: {},
        body: form,
      });

      alert("회원가입 성공!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <Box>
      <Typography variant="h5"> 회원가입</Typography>

      <TextField
        label="이름"
        name="name"
        fullWidth
        margin="normal"
        onChange={onChange}
      />

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

      <TextField
        label="주소"
        name="address"
        fullWidth
        margin="normal"
        onChange={onChange}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={register}>
        회원가입
      </Button>
    </Box>
  );
}

export default RegisterPage;
