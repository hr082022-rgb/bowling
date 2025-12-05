import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import bowlingBalls from "../data/balls";
import bowlingJerseys from "../data/jerseys";
import bowlingShoes from "../data/shoes";
import bowlingBags from "../data/bags";
import bowlingExtras from "../data/extras";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart, items } = useCart();

  const allBalls = [...bowlingBalls];
  const allJerseys = [...bowlingJerseys];
  const allShoes = [...bowlingShoes];
  const allBags = [...bowlingBags];
  const allExtras = [...bowlingExtras];

  const allProducts = [
    ...allBalls,
    ...allJerseys,
    ...allShoes,
    ...allBags,
    ...allExtras,
  ];

  const product = allProducts.find((p) => String(p.id) === id);
  const isBall = allBalls.some((p) => String(p.id) === id);
  const isJersey = allJerseys.some((p) => String(p.id) === id);
  const isShoes = allShoes.some((p) => String(p.id) === id);

  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(14);
  const [size, setSize] = useState(isJersey ? "M" : ""); // 유니폼은 기본 M, 신발은 선택 필요
  const [showPopup, setShowPopup] = useState(false);

  if (!product) {
    return (
      <main>
        <p>상품을 찾을 수 없습니다.</p>
        <button onClick={() => nav(-1)}>뒤로가기</button>
      </main>
    );
  }

  const thumbs = [product.img, product.img, product.img];

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  const handleAdd = () => {
    if (qty <= 0) return;

    // 볼링화: 사이즈 필수
    if (isShoes && !size) {
      alert("사이즈를 선택하세요.");
      return;
    }

    const already = items.find((it) => it.id === product.id);
    if (already) {
      alert("이미 장바구니에 있는 상품입니다.");
      return;
    }

    let productForCart = { ...product };
    if (isBall) productForCart = { ...productForCart, weight };
    if (isJersey || isShoes) productForCart = { ...productForCart, size };

    addToCart(productForCart, qty);

    if (isBall) {
      alert(`장바구니에 담았습니다. (무게: ${weight}lb, 수량: ${qty}개)`);
    } else if (isJersey || isShoes) {
      alert(`장바구니에 담았습니다. (사이즈: ${size}, 수량: ${qty}개)`);
    } else {
      alert("장바구니에 담았습니다.");
    }

    setShowPopup(true);
  };

  const weightOptions = [10, 12, 14, 15, 16];
  const jerseySizeOptions = ["S", "M", "L", "XL"];
  const shoeSizeOptions = [230, 240, 250, 260, 270, 280, 290];

  const goCart = () => {
    setShowPopup(false);
    nav("/cart");
  };

  const goShop = () => {
    setShowPopup(false);
    nav("/shop");
  };

  return (
    <main className="product-page">
      <div className="product-main">
        <div className="product-left">
          <div className="product-thumbs">
            {thumbs.map((src, idx) => (
              <img key={idx} src={src} alt={product.name} />
            ))}
          </div>
          <div className="product-big">
            <img src={product.img} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-desc">
            {product.desc ||
              "볼링 실력을 올려주는 고급 볼링 용품입니다. 초보부터 상급자까지 사용하기 좋은 제품입니다."}
          </p>
          <p className="product-price">{product.price.toLocaleString()}원</p>

          {/* 볼링공: 무게 선택 */}
          {isBall && (
            <div style={{ marginTop: "12px", marginBottom: "12px" }}>
              <span style={{ marginRight: "8px" }}>무게(파운드):</span>
              {weightOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  style={{
                    marginRight: "6px",
                    padding: "6px 10px",
                    borderRadius: "16px",
                    border: "1px solid #1e70c9",
                    background: weight === w ? "#1e70c9" : "#fff",
                    color: weight === w ? "#fff" : "#1e70c9",
                    cursor: "pointer",
                  }}
                >
                  {w}lb
                </button>
              ))}
            </div>
          )}

          {/* 유니폼: 사이즈 선택 (S~XL) */}
          {isJersey && (
            <div style={{ marginTop: "12px", marginBottom: "12px" }}>
              <span style={{ marginRight: "8px" }}>사이즈:</span>
              {jerseySizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    marginRight: "6px",
                    padding: "6px 10px",
                    borderRadius: "16px",
                    border: "1px solid #1e70c9",
                    background: size === s ? "#1e70c9" : "#fff",
                    color: size === s ? "#fff" : "#1e70c9",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* 볼링화: 사이즈 선택 (230~290) */}
          {isShoes && (
            <div style={{ marginTop: "12px", marginBottom: "12px" }}>
              <span style={{ marginRight: "8px" }}>사이즈(mm):</span>
              {shoeSizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(String(s))}
                  style={{
                    marginRight: "6px",
                    padding: "6px 10px",
                    borderRadius: "16px",
                    border: "1px solid #1e70c9",
                    background: size === String(s) ? "#1e70c9" : "#fff",
                    color: size === String(s) ? "#fff" : "#1e70c9",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="product-buy">
            <span>구매개수:</span>
            <button onClick={dec}>-</button>
            <span>{qty}</span>
            <button onClick={inc}>+</button>
            <button onClick={handleAdd}>장바구니 추가</button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="cart-popup">
          <p>장바구니에 상품이 담겼습니다.</p>
          <div className="cart-popup-buttons">
            <button onClick={goCart}>장바구니로 가기</button>
            <button onClick={goShop}>쇼핑 더하기</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetail;
