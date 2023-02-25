import Nav from "./Nav";
import Logo from "components/layout/common/Logo";
import Breadcrumbs from "components/layout/common/Breadcrumbs";

import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { InterviewDataAtom } from "store/interview/atom";
import { MdPublic } from "react-icons/md";

const NavInterview = () => {
  const roomInfo = useRecoilValue(InterviewDataAtom);
  const viewer = [roomInfo?.roomViewer1Idx, roomInfo?.roomViewer2Idx, roomInfo?.roomViewer3Idx];
  console.log(viewer);
  let roomViewer = 1;
  viewer.forEach(v => {
    if (v !== null && v !== undefined) {
      roomViewer += 1;
    }
  });

  return (
    <Nav>
      <StyledLeftSection>
        <Logo />
        <Breadcrumbs />
      </StyledLeftSection>
      {/* TODO: AI 면접관/유저 면접관 구분 */}
      <StyledInterviewType>
        {roomInfo?.roomType === "AI" ? (
          "AI 면접"
        ) : (
          <>
            <span className="roomPeopleNum">
              {roomViewer} / {roomInfo?.roomPeopleNum}
              <MdPublic size={27} color="var(--push-gray)" />
            </span>
          </>
        )}
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
  .roomPeopleNum {
    display: flex;
    align-items: center;
    svg {
      margin-left: 15px;
    }
  }
`;
