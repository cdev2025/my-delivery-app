import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function MenuCard({ menu, onAdd }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia component="img" height="160" image={menu.thumbnail_url} />

      <CardContent>
        <Typography variant="h6">{menu.name}</Typography>
        <Typography> ₩ {menu.amount.toLocaleString()}</Typography>

        <Button variant="contained" onClick={() => onAdd(menu)}>
          장바구니 담기
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuCard;
