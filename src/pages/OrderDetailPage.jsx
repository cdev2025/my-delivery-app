import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../api/ApiService";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

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

function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      setError("");

      //api호출
      const response = await ApiService.get(`/api/user-order/id/${orderId}`);

      console.log("주문 상세 응답: ", response);

      if (response.body) {
        setOrderDetail(response.body);
      } else {
        setError("주문 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("주문 상세 조회 실패: ", error);
      setError("주문 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

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

  if (loading) {
    return (
      // 로딩중인 경우 렌더링 영역
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography> 주문 내역을 불러오는 중... </Typography>
      </Container>
    );
  }

  // 안전하게 데이터 추출
  const order = orderDetail?.user_order_response || {};
  const store = orderDetail?.store_response || {};
  const menus = orderDetail?.store_menu_response_list || [];

  const statusInfo = getStatusInfo(order.status);

  return (
    // 데이터가 로딩 됐을 때, 렌더링 영역
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
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
            주문 상세
          </Typography>
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="large"
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          주문번호: #{order.id || "-"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          주문일시 : {formatDate(order.ordered_at)}
        </Typography>
      </Box>

      {/* 스토어 정보 */}
      {store.name && (
        <Paper>
          <Typography variant="h6"> 가게 정보 </Typography>
          <Typography variant="body1">🏪 {store.name}</Typography>
        </Paper>
      )}

      {/* 주문 메뉴 미리보기 */}
      <Typography fontWeight="bold">주문 메뉴: </Typography>
      {menus.length > 0 ? (
        <Box>
          {menus.slice(0, 2).map((menu, index) => (
            <Typography key={`menu-${index}`} variant="body2" sx={{ mb: 0.5 }}>
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

      {/* 총 결재 금액 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1.5,
          borderTop: "2px solid",
          borderColor: "primary.light",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          총 결제 금액
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₩ {order.amount.toLocaleString()}
        </Typography>
      </Box>
    </Container>
  );
}

export default OrderDetailPage;
