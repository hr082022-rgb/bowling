import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h2>HONOR</h2>
      <p>볼링용품 쇼핑과 볼링 점수 계산을 할 수 있는 사이트입니다.</p>

      <section>
        <h3>볼링용품 쇼핑</h3>
        <p>다양한 볼링공과 팀 유니폼을 둘러보세요.</p>
        <Link to="/shop" className="link-btn">
          볼링용품 보러가기
        </Link>
      </section>

      <section>
        <h3>볼링 점수 계산기</h3>
        <p>게임 후 프레임 점수를 입력하면 총점을 빠르게 계산해줍니다.</p>
        <Link to="/score" className="link-btn">
          점수 계산하러가기
        </Link>
      </section>
    </main>
  );
}

export default Home;
