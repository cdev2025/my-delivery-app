import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";

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

  return <div>OrderListPage</div>;
}

export default OrderListPage;
