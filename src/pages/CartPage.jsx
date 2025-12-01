import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../store/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  return (
    <Box>
      <Typography variant="h4">장바구니</Typography>

      {items.length === 0 && <p>장바구니가 비어있습니다</p>}

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mt: 2 }}
        >
          <Typography variant="h6">{item.name}</Typography>
          <Typography>₩ {item.amount.toLocaleString()}</Typography>

          <Button
            color="error"
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => dispatch(removeItem(item.id))}
          >
            삭제
          </Button>
        </Box>
      ))}

      {items.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => dispatch(clearCart())}
        >
          장바구니 비우기
        </Button>
      )}
    </Box>
  );
}

export default CartPage;
