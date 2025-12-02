// src>api>ApiService.js : Axios 인스턴스 생성
import axios from "axios";
import store from "../store";

const ApiService = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

// 추후에 인터셉터를 여기에 추가
/**
 * 요청 인터셉터
 * - Redux 전역 상태(stroe)에 저장된 accessToken을 가져와서 자동으로 헤더에 포함
 * - 단, /api/** 요청에만 Authorization 헤더를 붙이도록
 *     (open-api는 인중 없이 사용 가능)
 */
ApiService.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;

    // 로그인 이후 /api 요청에만 토큰을 자동 추가
    if (accessToken && config.url.startsWith("/api/")) {
      config.headers["authorization-token"] = accessToken;
    }

    return config;
  },
  (error) => {
    console.error("요청 인터셉터 오류: ", error);
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * - axios 기본 구조 (respose.data, repose.status 등)를 단순화
 * - 모든 API 응답은 response.data만 반환하도록 통일
 *
 *
 * 실제 axios 응답 객체
 * {
 *    config: ....
 *    data: {result: {...}, body: {...}},
 *    status: 200,
 *    ...
 * }
 *
 * -> 인터셉터 적용 후 return 값은 : response.data
 * {
 *    result: {...},
 *    body: {...} //DTO
 * }
 *
 */
ApiService.interceptors.response.use(
  (response) => {
    // 항상 response.data만 반환 -> 프론트에서 구조 접근이 쉬워지도록
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;

    // 토큰 만료 또는 인증 실패 처리
    if (status === 401 || status === 403) {
      console.warn("토큰 만료 또는 인증 실패 감지: ", status);

      // 1. Redux + localStorage에서 토큰 완전 삭제
      store.dispatch(logout());

      // 2. 사용자에게 알림
      alert("로그인 세션이 만됴되었습니다. 다시 로그인해주세요.");

      // 3. 로그인 페이지로 강제 이동 (무한 루프 방지)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    console.error("응답 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

export default ApiService;
