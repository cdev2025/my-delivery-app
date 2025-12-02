import { BorderBottom } from "@mui/icons-material";
import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // 주문 정보 상태 : useState
  const [deliveryAddress, SetDeliveryAddres] = useState(user?.address || "");
  const [orderRequest, SetOrderRequest] = useState(""); // 입력폼으로 입력받은 주문 요청사항
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 총 금액 계산
  const totalAmount = items.reduce((sum, item) => {
    return sum + item.amount * (item.quantity || 1);
  }, 0);

  // 주문 요청 핵심 로직

  // 장바구니가 비어있으면 안내 표시
  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4">장바구니가 비어있습니다.</Typography>
        <Button variant="contained" onClick={() => navigate("/cart")}>
          장바구니로 이동
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">주문하기</Typography>

      {error && (
        <Alert serverity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* 1. 주문 메뉴 요약 */}
      <Paper>
        <Typography variant="h6"> 주문 메뉴</Typography>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              pb: 1,
              BorderBottom: "1px solid #eee",
            }}
          >
            <Box>
              <Typography variant="body1"> {item.name}</Typography>
              <Typography variant="body2">
                ₩{item.amount.toLocaleString()} x {item.quantity || 1}개
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>

      {/* 2. 배달 정보 입력 */}

      {/* 3. 주문 버튼 + 장바구니로 이동 버튼*/}
    </Container>
  );
}

export default OrderPage;
