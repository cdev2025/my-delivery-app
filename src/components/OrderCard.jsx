import { Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";

// 주문 상태별 표시 설정
const getStatusInfo = (status) => {
  const statusMap = {
    ORDER: { label: "주문접수", color: "primary" },
    ACCEPT: { label: "주문승인", color: "info" },
    COOKING: { label: "조리중", color: "warning" },
    DELIVERY: { label: "배달중", color: "info" },
    RECEIVE: { label: "배달완료", color: "success" },
  };
  return statusMap[status] || { label: status || "알수없음", color: "default" };
};

function OrderCard({ orderDetail }) {
  const order = orderDetail?.user_order_response || {};
  const store = orderDetail?.store_response || {};
  const menu = orderDetail?.store_menu_response_list || [];

  const statusInfo = etStatusInfo(order.status);

  // 필수 데이터 (주문id)가 없으면 렌더링하지 않도록
  if (!order.id) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        {/* 헤더: 주문번호 + 상태 */}
        <Box>
          <Typography variant="6" fontWeight="bold">
            주문 <div id={order.id}></div>
          </Typography>
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        </Box>

        {/* 스토어 정보 */}
        {store.name && <Typography variant="body1">🏪 {store.name}</Typography>}
      </CardContent>
    </Card>
  );
}

export default OrderCard;
