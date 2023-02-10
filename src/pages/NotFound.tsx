import notFound from "static/images/404.svg";
import styled from "@emotion/styled";

const NotFound = () => {
  return (
    <StyledWrap>
      <StyledImg src={notFound} alt="404" />
      찾으시는 페이지가 없습니다.
    </StyledWrap>
  );
};

export default NotFound;

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
