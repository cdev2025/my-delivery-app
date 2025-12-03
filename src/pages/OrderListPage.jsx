import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import { Alert, CircularProgress, Container, Typography } from "@mui/material";
import OrderCard from "../components/OrderCard";

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 주문 내역 조회 api
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await ApiService.get("/api/user-order/current");

      console.log("주문 내역 응답:", response);

      //   if (response.body && Array.isArray(response.body)) {
      //     // 최신 주문이 위로 오도록 정렬
      //     const sortedOrders = response.body.sort((a, b) => {
      //       return new Date(b.ordered_at) - new Date(a.ordered_at);
      //     });
      //     setOrders(sortedOrders);
      //   }
      setOrders(response.body);
    } catch (error) {
      console.error("주문 내역 조회 실패: ", error);
      setError("주문 내역을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 최초 렌더링 시, 데이터 가져오도록
  useEffect(() => {
    fetchOrders();
  }, []);

  //----------------------------

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography> 주문 내역을 불러오는 중... </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        주문 내역
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            주문 내역이 없습니다
          </Typography>
        </Box>
      ) : (
        orders.map((order, index) => (
          <OrderCard key={index} orderDetail={order} />
        ))
      )}
    </Container>
  );
}

export default OrderListPage;
