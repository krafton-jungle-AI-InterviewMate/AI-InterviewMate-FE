import { Link } from "react-router-dom";
import mainIllust from "static/images/undraw_Interview_re_e5jn.png";
import styled from "@emotion/styled";
import { StyledOrangeBtn } from "styles/OrangeBtn";

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
    color: var(--main-black);
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
    display: block;
    margin-top: 60px;
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
        <Link to="/lobby">
          <StyledOrangeBtn width="250px" height="70px">
            바로 시작하기
          </StyledOrangeBtn>
        </Link>
      </StyledStart>
      <img src={mainIllust} alt="interview image" />
    </StyledHomeContents>
  );
};

export default Home;
