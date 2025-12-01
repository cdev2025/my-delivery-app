import { createSlice } from "@reduxjs/toolkit";

// localStorage에서 저장된 장바구니 정보 읽어오기
const getStoredCart = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  } catch (error) {
    console.error("localStorage 장바구니 일기 오류: ", error);
    return { items: [] };
  }
};

const storedCart = getStoredCart();

// 초기상태: localStorage에서 복원
const initialState = {
  items: storedCart.items || [], // 장바구니 메뉴 목록
};

// localStorage 동기화 헬퍼 함수
const syncToLocalStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify({ items }));
  } catch (error) {
    console.error("localStorage 장바구니 저장 오류:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 장바구니에 메뉴 추가
    addItem: (state, action) => {
      const newItem = action.payload;

      // 동일한 메뉴가 있는지 확인
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        //이미 있으면 수량 증가
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // 없으면 새로 추가(수량 1로 초기화)
        state.items.push({ ...newItem, quantity: 1 });
      }

      //localStorage에 동기화
      syncToLocalStorage(state.items);
    },

    // 장바구니에서 특정 메뉴 삭제
    removeItem: (state, action) => {
      // 받아온 데이터(id)로 검색해서 id가 같지 않은 값만 다시 items에 저장(id가 같은 요소 삭제)
      state.items = state.items.filter((item) => item.id != action.payload);

      //localStorage에 동기화
      syncToLocalStorage(state.items);
    },

    // 특정 메뉴의 수량 변경
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity < 0) {
          // 수량이 0 이하면 삭제
          state.items = state.items.filter((item) => item.id != id);
        } else {
          item.quantity = quantity;
        }
      }

      //localStorage에 동기화
      syncToLocalStorage(state.items);
    },

    // 장바구니 비우기
    clearCart: (state) => {
      state.items = [];

      //localStorage에 동기화
      syncToLocalStorage(state.items);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
