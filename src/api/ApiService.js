// src>api>ApiService.js : Axios 인스턴스 생성
import axios from "axios";

const ApiService = axios.create({
  baseURL: "http://localhost:8080",
});

// 추후에 인터셉터를 여기에 추가
export default ApiService;
