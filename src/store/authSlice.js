import { createSlice } from "@reduxjs/toolkit";

// Redux전역 상태에 저장할 인증 데이터
const initialState = {
  accessToken: null, // 로그인 후 받은 JWT Access Token
  user: null, // me API 호출 결과 저장
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 성공 시 토큰 + 사용자 데이터 저장
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    // 사용자 정보만 갱신 (me API 호출 후 사용)
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // 로그아웃 처리
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
