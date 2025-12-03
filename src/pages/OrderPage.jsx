import { BorderBottom } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiService from "../api/ApiService";
import { clearCart } from "../store/cartSlice";

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
  const handleSubmitOrder = async () => {
    // 유효성 검사
    if (!deliveryAddress.trim()) {
      setError("배달 주소를 입력해주세요.");
      return;
    }

    if (items.length === 0) {
      alert("장바구니가 비어있습니다.");
      navigate("/cart");
      return;
    }

    if (
      !window.confirm(
        `총 ${totalAmount.toLocaleString()}원을 결제하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 데이터 변환: [{id, quantity}, {id, quantity}, ...] -> [id, id, id, ...]
      // flatMap() : 중첩된 구조(리스트 안 리스트)를 평탄화(flatten)한 뒤 변환하는 함수
      //          1:N 변환 (한 요소를 -> 여러 요소)
      //          결과가 "2차원 => 1차원"으로 변화
      /*    List<List<Integer>> numbers = List.of(
            List.of(1, 2),
            List.of(3,4)
        ); // numbers =[[1,2], [3, 4]]

        List<Integer> flat = numbers.stream()
                                    .flatMap(list -> list.stream())
                                    .toList();
                                    // 결과: [1, 2, 3, 4] */
      const menuIds = items.flatMap((item) => {
        const quantity = item.quantity || 1;
        return Array(quantity).fill(item.id);
      });

      console.log("주문 요청 메뉴 ID: ", menuIds);

      // API 요청
      const response = await ApiService.post("/api/user-order", {
        result: {},
        body: {
          store_menu_id_list: menuIds,
        },
      });

      console.log("주문 응답: ", response);

      if (!response.body || !response.body.id) {
        throw new Error("주문 응답 형식이 올바르지 않습니다.");
      }

      // 주문 성공 처리
      dispatch(clearCart()); // 장바구니 비우기
      alert("주문이 완료되었습니다.");
      // 주문 상세 페이지로 이동
      navigate(`/orders/${response.body.id}`);
    } catch (error) {
      console.error("주문 실패:", error);
      setError("주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

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
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* 1. 주문 메뉴 요약 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
              <Typography variant="body2" color="text.secondary">
                ₩ {item.amount.toLocaleString()} x {item.quantity || 1}개
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ₩ {(item.amount * (item.quantity || 1)).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6">총 주문 금액</Typography>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ₩ {totalAmount.toLocaleString()}
          </Typography>
        </Box>
      </Paper>

      {/* 2. 배달 정보 입력 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">배달 정보</Typography>

        <TextField
          label="배달 주소"
          fullWidth
          value={deliveryAddress}
          onChange={(e) => SetDeliveryAddres(e.target.value)}
          required
          placeholder="예: 서울시 강남구 테헤란로 123, 101호"
        />

        <TextField
          label="요청사항 (선택)"
          fullWidth
          multiline
          rows={3}
          value={orderRequest}
          onChange={(e) => SetOrderRequest(e.tartget.value)}
          placeholder="예: 문 앞에 놔주세요, 초인종 누리지 말고 전화주세요."
        />
      </Paper>

      {/* 3. 주문 버튼 + 장바구니로 이동 버튼*/}
      <Button
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={{ py: 1.5, fontSize: "1.1rem" }}
        onClick={() => handleSubmitOrder()}
      >
        {loading ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            주문 처리 중...
          </>
        ) : (
          `₩ ${totalAmount.toLocaleString()} 결재하기`
        )}
      </Button>

      <Button
        variant="outlined"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
        onClick={() => navigate("/cart")}
      >
        장바구니로 돌아가기
      </Button>
    </Container>
  );
}

export default OrderPage;
