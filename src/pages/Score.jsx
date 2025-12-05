import { useState } from "react";

function Score() {
  const [scores, setScores] = useState(Array(10).fill("")); // 빈 상태로 시작
  const [total, setTotal] = useState(null);
  const [history, setHistory] = useState([]);

  const changeScore = (idx, value) => {
    const v = value === "" ? "" : Math.max(0, Number(value));
    setScores((prev) => prev.map((s, i) => (i === idx ? v : s)));
  };

  const calc = () => {
    const nums = scores.map((s) => (s === "" ? 0 : Number(s)));
    const sum = nums.reduce((a, b) => a + b, 0);
    setTotal(sum);
    setHistory((prev) => [
      { id: Date.now(), total: sum, scores: nums },
      ...prev,
    ]);
  };

  return (
    <main>
      <h2>볼링 점수 계산기</h2>
      <section>
        <p>프레임별 점수를 입력하고 계산하기를 눌러주세요.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {scores.map((s, i) => (
            <input
              key={i}
              type="number"
              min="0"
              value={s}
              onChange={(e) => changeScore(i, e.target.value)}
              placeholder={`${i + 1}`}
            />
          ))}
        </div>
        <button onClick={calc}>점수 계산하기</button>
        {total !== null && <h3>총점: {total}점</h3>}
      </section>

      <section>
        <h3>계산 기록</h3>
        {history.length === 0 && <p>아직 기록이 없습니다.</p>}
        {history.length > 0 && (
          <ul>
            {history.map((h, idx) => (
              <li key={h.id}>
                #{history.length - idx} — 총점 {h.total}점 (
                {h.scores.join(", ")})
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Score;
