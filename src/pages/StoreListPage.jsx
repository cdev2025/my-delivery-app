import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORE_CATEGORIES } from "../constants/storeCategories";
import { Box, Typography } from "@mui/material";
import ApiService from "../api/ApiService";

function StoreListPage() {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  // 선택된 카테고리 상태
  const [category, setCategory] = useState("");

  // 스토어 목록 요청 함수
  const fetchStores = async (seletedCategory = "") => {
    try {
      setLoading(true);

      const response = await ApiService.get("/api/store/search", {
        params: {
          storeCategory: seletedCategory,
          undefined,
        },
      });

      console.log("스토어 응답:", response);

      if (!response || !response.body) {
        alert("스토어 목록 조회 불가(인증 실패 또는 서버 오류");
        return;
      }

      setStores(response.body);
    } catch (err) {
      console.error("스토어 목록 오류:", err);
      alert("스토어 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  //첫 렌더링 시 전체 스토어 조회
  useEffect(() => {
    fetchStores("COFFEE_TEA");
  }, []);

  return (
    <Box>
      <Typography variant="h4">스토어 목록</Typography>
    </Box>
  );
}

export default StoreListPage;
