import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!id || !pw) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    const saved = localStorage.getItem("bowlUser");
    if (!saved) {
      setError("가입된 계정이 없습니다. 먼저 회원가입을 해주세요.");
      return;
    }
    const user = JSON.parse(saved);
    if (user.id !== id || user.pw !== pw) {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    login(user.id, user.name || user.id);
    nav("/");
  };

  return (
    <main className="auth-page">
      <h2>로그인</h2>
      <p>로그인해주세요.</p>
      <form className="auth-form" onSubmit={submit}>
        <input
          placeholder="아이디"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError("");
          }}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </main>
  );
}

export default Login;
