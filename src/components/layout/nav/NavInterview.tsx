import Nav from "./Nav";
import Logo from "components/layout/common/Logo";
import Breadcrumbs from "components/layout/common/Breadcrumbs";

import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { interviewDataAtom, isInterviewStartAtom, roomPeopleNowAtom } from "store/interview/atom";
import { MdPublic } from "react-icons/md";
import { useEffect, useState } from "react";

const NavInterview = () => {
  const interviewData = useRecoilValue(interviewDataAtom);
  const roomPeopleNow = useRecoilValue(roomPeopleNowAtom);
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);

  const [interviewer, setInterviewer] = useState(1);

  useEffect(() => {
    setInterviewer(roomPeopleNow);
  }, [roomPeopleNow]);

  return (
    <>
      {!isInterviewStart && (
        <Nav>
          <StyledLeftSection>
            <Logo />
            <Breadcrumbs />
          </StyledLeftSection>
          {/* TODO: AI 면접관/유저 면접관 구분 */}
          <StyledInterviewType>
            {interviewData?.roomType === "AI" ? (
              "AI 면접"
            ) : (
              <>
                <span className="roomPeopleNum">
                  {interviewer + 1} / {interviewData?.roomPeopleNum}
                  <MdPublic size={27} color="var(--push-gray)" />
                </span>
              </>
            )}
          </StyledInterviewType>
        </Nav>
      )}
    </>
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
