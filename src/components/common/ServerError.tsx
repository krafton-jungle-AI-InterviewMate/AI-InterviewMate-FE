import notFound from "static/images/500.svg";
import styled from "@emotion/styled";

const ServerError = () => {
  return (
    <StyledWrap>
      <StyledImg src={notFound} alt="500" />
      내부 서버 에러.
    </StyledWrap>
  );
};

export default ServerError;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledImg = styled.img`
  width: 320px;
  margin-bottom: 60px;
`;
