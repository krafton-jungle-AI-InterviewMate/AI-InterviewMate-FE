import Nav from "./Nav";
import Logo from "components/layout/common/Logo";
import Breadcrumbs from "components/layout/common/Breadcrumbs";

import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { InterviewDataAtom } from "store/interview/atom";

const NavInterview = () => {
  const roomType = useRecoilValue(InterviewDataAtom);
  return (
    <Nav>
      <StyledLeftSection>
        <Logo />
        <Breadcrumbs />
      </StyledLeftSection>
      {/* TODO: AI 면접관/유저 면접관 구분 */}
      <StyledInterviewType>
        {roomType?.roomType === "AI" ? "AI 면접" : "유저 면접"}
      </StyledInterviewType>
    </Nav>
  );
};

export default NavInterview;

const StyledLeftSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledInterviewType = styled.p`
  font-size: 24px;
  color: var(--font-gray);
`;
