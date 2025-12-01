import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function StoreCard({ store, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{ cursot: "pointer", ":hover": { backgroundColor: "#f5f5f5" } }}
    >
      <CardMedia
        component="img"
        height="180"
        image={store.thumbnail_url}
        alt={store.name}
      />

      <CardContent>
        <Typography variant="h6">{store.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {store.category} • ⭐ {store.star}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StoreCard;
