import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Score from "./pages/Score";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";

function AppLayout() {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCount } = useCart();
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link-active" : "");

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) {
      alert("검색어를 입력해주세요.");
      return;
    }
    nav("/shop", { state: { keyword: q } });
    setSearch("");
  };

  return (
    <>
      <header>
        <h1>HONOR</h1>

        {/* 헤더 중앙 검색창 */}
        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="볼링용품 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <nav>
          <NavLink to="/" className={linkClass}>
            홈
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            볼링용품
          </NavLink>
          <NavLink to="/score" className={linkClass}>
            점수 계산
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            장바구니({totalCount})
          </NavLink>

          {isLoggedIn ? (
            <>
              <span className="nav-user">{user.id}님</span>
              <button className="nav-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                로그인
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                회원가입
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/score" element={<Score />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
