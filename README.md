# my-delivery-app

- React + Vite
- 배달 플랫폼 프론트엔드 실습 프로젝트
- 백엔드(Spring Boot) API와 연동하여 회원가입/로그인/스토어 목록/메뉴/장바구니/주문하기까지 구현합니다.

---

## [2025년 11월 27일]

### 프로젝트 생성

```
npm create vite@latest my-delivery-app -- --template react
```

### 개발 환경 설정

```
cd my-delivery-app
npm install
npm install react-router-dom
npm install axios
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @reduxjs/toolkit react-redux
npm run dev
```

### src 폴더에 App.jsx 와 main.jsx만 남기고 모두 정리(삭제)하기

### src > api 폴더 만들기

- api 폴더 안에 **ApiService.js** 파일 만들기
  ```
  // Axios 인스턴스 생성
  import axios from "axios";
  const ApiService = axios.create({
  baseURL: "http://localhost:8080",
  });
  // 추후에 인터셉터를 여기에 추가
  export default ApiService;
  ```

### main.jsx 내용 수정

- React Router 적용을 하기 위해 <App />을 BrowserRouter로 감싸야함

  ```
  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App.jsx";
  import { BrowserRouter } from "react-router-dom";

  createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
  </StrictMode>
  );
  ```

### App.jsx 내용 수정

```
    import { useState } from 'react'
    function App() {

    return (
        <div>
        <h1>배달 플랫폼 Reat</h1>
        </div>
    )
    }
    export default App
```

---

## [2025년 11월 28일] 회원가입 · 로그인 · 인증(Authorization)

### 회원가입 요청

```
ApiService.post("/open-api/user/register", {
  result: {},
  body: { email, password, name },
});
```

### 로그인 성공 시 처리

- localStorage에 accessToken 저장

### Axios Request 인터셉터 — JWT 자동 주입

```
ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["authorization-token"] = token;
  return config;
});
```

### me API 호출

- 로그인 사용자 정보 확인
  ```
  GET /api/user/me
  ```

---

## [2025년 12월 1일] 스토어 목록 · 메뉴 목록 · 장바구니

### 스토어 목록 조회

```
ApiService.get("/api/store/search", {
  params: { storeCategory: selectedCategory },
});
```

### 메뉴 목록 조회

```
ApiService.get("/api/store-menu/search", {
  params: { storeId },
});
```

### Redux 장바구니 Slice

```
items: [],
addItem: (state, action) => { state.items.push(action.payload); },
removeItem: (state, action) => {
  state.items = state.items.filter((item) => item.id !== action.payload);
},
clearCart: (state) => { state.items = []; },
```

### 장바구니 페이지

- 메뉴 리스트

---

## [2025년 12월 2일] 주문하기 구현 (단일 페이지 방식)

### 장바구니 페이지

- 장바구니 수량 변경 버튼
- 총 금액
- 주문하기 버튼

### 주문 요청 API

```
POST /api/user-order
```

### 주문 요청 예시

```
const ids = cartItems.map(item => item.id);

ApiService.post("/api/user-order", {
  result: {},
  body: { storeMenuIdList: ids },
});
```

### 주문 성공 후 처리

- clearCart()
- 주문 완료 페이지로 이동 => 내일

---
