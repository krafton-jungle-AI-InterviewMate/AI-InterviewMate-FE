import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledHomeContents = styled.div`
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 120px;
  img {
    width: 550px;
  }
`;

const StyledStart = styled.div`
  text-align: left;
  p {
    font-size: 48px;
    font-weight: 400;
    line-height: 60px;
    margin: 0;
    margin-bottom: 25px;
  }
  span {
    font-size: 20px;
    color: var(--font-gray);
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 70px;
    margin-top: 60px;
    background-color: var(--main-orange);
    border-radius: 15px 30px;
    color: white;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    transition: 0.2s;
    &:hover {
      background-color: var(--light-orange);
    }
    &:active {
      background-color: var(--push-orange);
    }
  }
`;

const Home = () => {
  return (
    <StyledHomeContents>
      <StyledStart>
        <p>
          면접 합격은
          <br />
          AI 인터뷰 메이트.
        </p>
        <span>충분한 연습을 통해 당당히 취업하세요.</span>
        <Link to="/lobby">바로 시작하기</Link>
      </StyledStart>
      <img src="images/undraw_Interview_re_e5jn.png" alt="interview image" />
    </StyledHomeContents>
  );
};

export default Home;
