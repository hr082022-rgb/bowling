import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        alert("이미 장바구니에 있는 상품입니다.");
        return prev;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, quantity: Math.max(1, it.quantity + delta) }
          : it
      )
    );
  };

  const totalCount = items.length;

  const totalPrice = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // 결제 기능: 알림 후 장바구니 비우기
  const checkout = () => {
    if (items.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }
    alert(`총 ${totalPrice.toLocaleString()}원이 결제되었습니다. 감사합니다.`);
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        changeQuantity,
        totalCount,
        totalPrice,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
