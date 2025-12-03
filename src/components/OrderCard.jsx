import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
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
  const menus = orderDetail?.store_menu_response_list || [];

  const statusInfo = getStatusInfo(order.status);

  // 날짜 포맷팅 헬퍼 함수
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "-";
    }
  };

  // 필수 데이터 (주문id)가 없으면 렌더링하지 않도록
  if (!order.id) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        {/* 헤더: 주문번호 + 상태 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="6" fontWeight="bold">
            주문 {order.id}
          </Typography>
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        </Box>

        {/* 스토어 정보 */}
        {store.name && <Typography variant="body1">🏪 {store.name}</Typography>}

        {/* 주문 일시 */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          주문일시 : {formatDate(order.ordered_at)}
        </Typography>

        {/* 주문 메뉴 미리보기 */}
        <Typography fontWeight="bold">주문 메뉴: </Typography>
        {menus.length > 0 ? (
          <Box>
            {menus.slice(0, 2).map((menu, index) => (
              <Typography
                key={`menu-${index}`}
                variant="body2"
                sx={{ mb: 0.5 }}
              >
                ৹ {menu.name}
              </Typography>
            ))}
            {menus.length > 2 && (
              <Typography variant="body2" color="text.secondaryt">
                외 {menus.length - 2}개 메뉴
              </Typography>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" color="warning.dark">
              메뉴 정보가 없습니다.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderCard;
