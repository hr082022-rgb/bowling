import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [addr, setAddr] = useState("");
  const [email, setEmail] = useState("");
  const [pwError, setPwError] = useState("");
  const [requiredError, setRequiredError] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!id || !name || !pw || !email) {
      setRequiredError("아이디, 닉네임, 비밀번호, 이메일은 필수 입력입니다.");
      return;
    }
    setRequiredError("");
    if (pw !== pw2) {
      setPwError("비밀번호가 틀립니다.");
      return;
    }
    setPwError("");
    const userData = { id, name, pw, addr, email };
    localStorage.setItem("bowlUser", JSON.stringify(userData));
    alert("회원가입이 완료되었습니다. 로그인해주세요.");
    nav("/login");
  };

  return (
    <main className="auth-page">
      <h2>회원가입</h2>
      <p>기본 정보와 배송지 정보를 입력해 주세요.</p>
      <form className="auth-form" onSubmit={submit}>
        <input
          placeholder="아이디"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setRequiredError("");
          }}
        />
        <input
          placeholder="닉네임"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setRequiredError("");
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setPwError("");
            setRequiredError("");
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={pw2}
          onChange={(e) => {
            setPw2(e.target.value);
            setPwError("");
          }}
        />
        {pwError && <p className="error-text">{pwError}</p>}
        <input
          placeholder="배송지 주소"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setRequiredError("");
          }}
        />
        {requiredError && <p className="error-text">{requiredError}</p>}
        <button type="submit">회원가입</button>
      </form>
    </main>
  );
}

export default Signup;
