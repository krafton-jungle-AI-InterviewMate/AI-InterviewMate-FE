import notFound from "static/images/400.svg";
import styled from "@emotion/styled";

const BadRequest = () => {
  return (
    <StyledWrap>
      <StyledImg src={notFound} alt="400" />
      잘못된 요청입니다.
    </StyledWrap>
  );
};

export default BadRequest;

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
