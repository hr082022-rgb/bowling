import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { items, changeQuantity, removeFromCart, totalPrice } = useCart();
  const { isLoggedIn } = useAuth();
  const nav = useNavigate();

  const handlePay = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      nav("/login");
      return;
    }
    if (items.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    const ok = window.confirm(
      `총 금액 ${totalPrice.toLocaleString()}원을 결제하시겠습니까? (모의 결제)`
    );
    if (!ok) return;
    items.forEach((item) => removeFromCart(item.id));
    alert("결제가 완료되었습니다. 이용해 주셔서 감사합니다.");
  };

  return (
    <main>
      <h2>장바구니</h2>

      {items.length === 0 && <p>장바구니가 비어있습니다.</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            background: "white",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "12px",
            border: "1px solid #ddd",
          }}
        >
          <img src={item.img} alt={item.name} width="70" />

          <div style={{ flex: 1 }}>
            <p>{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
            {item.weight && <p>무게: {item.weight}lb</p>}
            {item.size && <p>사이즈: {item.size}</p>}
          </div>

          <div>
            <button onClick={() => changeQuantity(item.id, -1)}>-</button>
            <span style={{ margin: "0 8px" }}>{item.quantity}</span>
            <button onClick={() => changeQuantity(item.id, 1)}>+</button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>삭제</button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3>총 금액: {totalPrice.toLocaleString()}원</h3>
          <button onClick={handlePay}>결제하기</button>
        </>
      )}
    </main>
  );
}

export default Cart;
