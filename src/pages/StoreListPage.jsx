import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORE_CATEGORIES } from "../constants/storeCategories";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ApiService from "../api/ApiService";
import StoreCard from "../components/StoreCard";

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

  //첫 렌더링 시 전체 스토어 조회 : 현재 카테고리별
  useEffect(() => {
    fetchStores("");
  }, []);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    // 선택된 카테고리로 다시 API 요청
    fetchStores(selected);
  };

  const goDetail = (storeId) => navigate(`/stores/${storeId}`);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        스토어 목록
      </Typography>

      {/* 카테고리 선택 UI */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>카테고리 선택</InputLabel>
        <Select
          value={category}
          lable="카테고리 선택"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">전체</MenuItem>
          {STORE_CATEGORIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress />}

      {/* 결과가 없음 */}
      {!loading && stores.length === 0 && (
        <Typography>조회 가능한 스토어가 없습니다.</Typography>
      )}

      {/* 스토어 리스트 */}
      {!loading &&
        stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onClick={() => goDetail(store.id)}
          />
        ))}
    </Box>
  );
}

export default StoreListPage;
