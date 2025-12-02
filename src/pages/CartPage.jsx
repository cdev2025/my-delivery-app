import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../store/cartSlice";
import { Add, Remove } from "@mui/icons-material";

function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // 총 주문 금액 계산 (수량 x 가격의 합)
  const totalAmount = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const amount = item.amount || 0;
    return sum + amount * quantity;
  }, 0);

  // 수량증가

  // 수량 감소

  // 메뉴 삭제
  const handleRemove = (itemId) => {
    if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
      dispatch(removeItem(itemId));
    }
  };

  // 장바구니 전체 비우기

  return (
    <Box>
      <Typography variant="h4">장바구니</Typography>

      {items.length > 0 && (
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => dispatch(clearCart())}
        >
          장바구니 비우기
        </Button>
      )}

      {items.length === 0 && <p>장바구니가 비어있습니다</p>}

      {items.map((item) => (
        <Card
          key={item.id}
          sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mt: 2 }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* 메뉴 이미지 */}
              {item.thumbnail_url && (
                <Box
                  component="img"
                  src={item.thumbnail_url}
                  alt={item.name}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              )}

              {/* 메뉴 정보 */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₩ {item.amount.toLocaleString()} x {item.quantity || 1}개
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₩ {(item.amount * (item.quantity || 1)).toLocaleString()}
                </Typography>
              </Box>

              {/* 수량 조절 버튼 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" color="primary">
                  <Remove />
                </IconButton>

                <Typography>{item.quantity || 1}</Typography>

                <IconButton size="small" color="primary">
                  <Add />
                </IconButton>
              </Box>

              <Button
                color="error"
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => handleRemove(item.id)}
              >
                삭제
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* 총 금액 및 주문 버튼 */}
      {items.length > 0 && (
        <Paper sx={{ mt: 3, p: 3, bgcolor: "primary.light" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">총 주문 금액</Typography>
            <Typography variant="h5">
              {" "}
              ₩ {totalAmount.toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ py: 1.5 }}
            onClick={() => alert("주문 기능 곧 구현!")}
          >
            주문하기 ({items.length}개 메뉴)
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default CartPage;
