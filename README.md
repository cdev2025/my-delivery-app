# my-delivery-app

- React + Vite

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
