import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Box>
      <Typography variant="h4">Home</Typography>

      {/* 비로그인 상태 */}
      <Box>
        <Typography>로그인 후 내 정보(me)를 확인할 수 있습니다.</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Link to="/register">
          <Button variant="contained">회원가입</Button>
        </Link>

        <Link to="/login">
          <Button variant="outlined">로그인</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default HomePage;
