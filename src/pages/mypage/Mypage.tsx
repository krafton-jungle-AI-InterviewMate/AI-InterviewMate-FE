import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledMypage = styled.div`
  width: 1000px;
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: var(--main-black);
  div {
    width: 500px;
    margin-bottom: 100px;
    text-align: left;
    h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    hr {
      width: 250px;
      height: 2px;
      background-color: var(--main-black);
      margin: 2px 0 15px;
      border: none;
    }
    a {
      display: block;
      font-size: 16px;
      font-weight: 500;
      color: var(--font-gray);
      &:hover {
        color: var(--main-blue);
      }
    }
    a:first-of-type {
      margin-bottom: 10px;
    }
  }
`;

const Mypage = () => {
  return (
    <StyledMypage>
      <div>
        <h2>회원 정보</h2>
        <hr />
        <Link to="/*">프로필 수정</Link>
        <Link to="/*">로그아웃</Link>
      </div>
      <div>
        <h2>인터뷰 관리</h2>
        <hr />
        <Link to="/mypage/result">면접 결과 확인</Link>
        <Link to="/mypage/questions">질문 꾸러미 관리</Link>
      </div>
      <div>
        <h2>고객 센터</h2>
        <hr />
        <a href="mailto:rlarlxo2628@gmail.com">이메일 문의</a>
        <Link to="/*">회원 탈퇴</Link>
      </div>
    </StyledMypage>
  );
};

export default Mypage;
