import { createSlice } from "@reduxjs/toolkit";

// localStorage에서 저장된 인증 정보 읽어오기
const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  } catch (error) {
    console.error("localStorage 읽기 오류: ", error);
    return {};
  }
};

const storedAuth = getStoredAuth();

// Redux전역 상태에 저장할 인증 데이터 : localStorage에서 복원
const initialState = {
  accessToken: storedAuth.accessToken || null,
  refreshToken: storedAuth.refreshToken || null,
  accessTokenExpiredAt: storedAuth.accessTokenExpiredAt || null,
  user: storedAuth.user || null, // me API 호출 결과 저장
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 성공 시 토큰 + 사용자 데이터 저장
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.accessToken;
      state.accessTokenExpiredAt = action.payload.accessTokenExpiredAt;
      state.user = action.payload.user;

      // localStorage에 동기화
      const authData = {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiredAt: state.accessTokenExpiredAt,
        user: state.user,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
    },

    // 사용자 정보만 갱신 (me API 호출 후 사용)
    setUser: (state, action) => {
      state.user = action.payload;

      // localStorage 업데이트
      const currentAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      currentAuth.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(currentAuth));
    },

    // 로그아웃 처리
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiredAt = null;
      state.user = null;

      // localStorage 완전 삭제
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
