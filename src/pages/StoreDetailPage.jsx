import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../api/ApiService";
import { Box, Typography } from "@mui/material";
import MenuCard from "../components/MenuCard";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

function StoreDetailPage() {
  const { storeId } = useParams();
  const dispatch = useDispatch();

  const [menus, setMenus] = useState([]);

  // 메뉴 목록 요청
  const fetchMenus = async () => {
    try {
      const res = await ApiService.get(
        `/api/store-menu/search?storeId=${storeId}`
      );
      setMenus(res.body);
    } catch (e) {
      console.error("메뉴 조회 실패:", e);
      alert("로그인이 필요합니다.");
    }
  };

  // 최초 렌더링 시 한 번만 데이터 가져오도록
  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <Box>
      <Typography variant="h4"> 메뉴 목록</Typography>

      {menus.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onAdd={(menu) => dispatch(addItem(menu))}
        />
      ))}
    </Box>
  );
}

export default StoreDetailPage;
