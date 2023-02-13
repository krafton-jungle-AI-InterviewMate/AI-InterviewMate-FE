import notFound from "static/images/404.svg";
import ExternalLink from "components/common/ExternalLink";
import styled from "@emotion/styled";

const NotFound = () => {
  return (
    <StyledWrap>
      <ExternalLink href="https://storyset.com/people">
        <StyledImg src={notFound} alt="People illustrations by Storyset" />
      </ExternalLink>
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
