import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { memberAtom } from "store/auth/atom";

import { PagesPath } from "constants/pages";

import mainIllust from "static/images/undraw_Interview_re_e5jn.png";
import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";

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
  button {
    display: block;
    margin-top: 60px;
  }
`;

const Home = () => {
  const {
    accessToken,
  } = useRecoilValue(memberAtom);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (accessToken) {
      navigate(PagesPath.LOBBY);
    }
    else {
      navigate(PagesPath.LOGIN);
    }
  };

  return (
    <StyledHomeContents>
      <StyledStart>
        <p>
          면접 합격은
          <br />
          AI 인터뷰 메이트.
        </p>
        <span>충분한 연습을 통해 당당히 취업하세요.</span>
        <StyledBtn
          width="250px"
          height="70px"
          color="orange"
          onClick={handleNavigate}
        >
          바로 시작하기
        </StyledBtn>
      </StyledStart>
      <img src={mainIllust} alt="interview image" />
    </StyledHomeContents>
  );
};

export default Home;
