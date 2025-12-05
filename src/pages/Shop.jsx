// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import bowlingBalls from "../data/balls";
import bowlingJerseys from "../data/jerseys";
import bowlingShoes from "../data/shoes";
import bowlingBags from "../data/bags";
import bowlingExtras from "../data/extras";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Shop() {
  const [apiCount, setApiCount] = useState(0);
  const [category, setCategory] = useState("all"); // all | ball | jersey | shoes | bag | etc
  const location = useLocation();
  const nav = useNavigate();
  const { items, addToCart } = useCart();

  // 헤더 검색에서 넘어온 검색어
  const [search, setSearch] = useState(() => {
    const kw =
      location.state && typeof location.state.keyword === "string"
        ? location.state.keyword
        : "";
    return kw;
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=5")
      .then((res) => setApiCount(res.data.products.length))
      .catch(() => setApiCount(0));
  }, []);

  // 다른 검색어로 다시 넘어온 경우
  useEffect(() => {
    if (location.state && typeof location.state.keyword === "string") {
      setSearch(location.state.keyword);
    }
  }, [location.state]);

  // 장바구니 담기
  const handleAddClick = (item) => {
    const isBall = bowlingBalls.some((p) => p.id === item.id);
    const isJersey = bowlingJerseys.some((p) => p.id === item.id);
    const isShoes = bowlingShoes.some((p) => p.id === item.id);
    const isBag = bowlingBags.some((p) => p.id === item.id);
    const isExtra = bowlingExtras.some((p) => p.id === item.id);

    // 볼링공 / 유니폼 / 볼링화 → 옵션 선택하러 싱글페이지로
    if (isBall) {
      alert("무게를 선택하세요.");
      nav(`/product/${item.id}`);
      return;
    }
    if (isJersey || isShoes) {
      alert("사이즈를 선택하세요.");
      nav(`/product/${item.id}`);
      return;
    }

    // 볼링가방 / 보조용품 → 바로 장바구니에 담기
    if (isBag || isExtra) {
      const already = items.find((it) => it.id === item.id);
      if (already) {
        alert("이미 장바구니에 있는 상품입니다.");
        return;
      }
      addToCart(item, 1);
      alert("장바구니에 담았습니다.");
      return;
    }

    // 분류 안 된 상품은 그냥 상세로 이동
    nav(`/product/${item.id}`);
  };

  const renderItem = (item) => (
    <li key={item.id}>
      <img src={item.img} width="90" alt={item.name} />
      <p>{item.name}</p>
      <p>{item.price.toLocaleString()}원</p>
      <button onClick={() => handleAddClick(item)} style={{ marginTop: 6 }}>
        장바구니 담기
      </button>
      <Link to={`/product/${item.id}`} className="link-btn">
        자세히 보기
      </Link>
    </li>
  );

  const keyword = search.trim().toLowerCase();
  const filterByName = (list) =>
    list.filter((p) => p.name.toLowerCase().includes(keyword));

  const filteredBalls = filterByName(bowlingBalls);
  const filteredJerseys = filterByName(bowlingJerseys);
  const filteredShoes = filterByName(bowlingShoes);
  const filteredBags = filterByName(bowlingBags);
  const filteredExtras = filterByName(bowlingExtras);

  return (
    <main>
      <h2>볼링 용품 쇼핑</h2>
      {/* <p>외부 API 연결됨: {apiCount}개 데이터 응답</p> */}

      {/* 카테고리 버튼 */}
      <div
        style={{
          margin: "12px 0 20px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCategory("all")}
          style={{
            marginTop: 0,
            background: category === "all" ? "#ff7f50" : "#ffffff",
            color: category === "all" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          전체
        </button>
        <button
          onClick={() => setCategory("ball")}
          style={{
            marginTop: 0,
            background: category === "ball" ? "#ff7f50" : "#ffffff",
            color: category === "ball" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          볼링공
        </button>
        <button
          onClick={() => setCategory("jersey")}
          style={{
            marginTop: 0,
            background: category === "jersey" ? "#ff7f50" : "#ffffff",
            color: category === "jersey" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          볼링 유니폼
        </button>
        <button
          onClick={() => setCategory("shoes")}
          style={{
            marginTop: 0,
            background: category === "shoes" ? "#ff7f50" : "#ffffff",
            color: category === "shoes" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          볼링화
        </button>
        <button
          onClick={() => setCategory("bag")}
          style={{
            marginTop: 0,
            background: category === "bag" ? "#ff7f50" : "#ffffff",
            color: category === "bag" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          볼링가방
        </button>
        <button
          onClick={() => setCategory("etc")}
          style={{
            marginTop: 0,
            background: category === "etc" ? "#ff7f50" : "#ffffff",
            color: category === "etc" ? "#ffffff" : "#ff7f50",
            border: "1px solid #ff7f50",
          }}
        >
          보조용품
        </button>
      </div>

      {(category === "all" || category === "ball") && (
        <section>
          <h3>볼링공</h3>
          <ul>{filteredBalls.map(renderItem)}</ul>
        </section>
      )}

      {(category === "all" || category === "jersey") && (
        <section>
          <h3>볼링 유니폼</h3>
          <ul>{filteredJerseys.map(renderItem)}</ul>
        </section>
      )}

      {(category === "all" || category === "shoes") && (
        <section>
          <h3>볼링화</h3>
          <ul>{filteredShoes.map(renderItem)}</ul>
        </section>
      )}

      {(category === "all" || category === "bag") && (
        <section>
          <h3>볼링가방</h3>
          <ul>{filteredBags.map(renderItem)}</ul>
        </section>
      )}

      {(category === "all" || category === "etc") && (
        <section>
          <h3>보조용품</h3>
          <ul>{filteredExtras.map(renderItem)}</ul>
        </section>
      )}
    </main>
  );
}

export default Shop;
