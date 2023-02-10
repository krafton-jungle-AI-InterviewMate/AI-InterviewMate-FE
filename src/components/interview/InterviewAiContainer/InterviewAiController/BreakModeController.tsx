import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { interviewModeAtom } from "store/interview/atom";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";

const BreakModeController = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setInterviewMode("question");
    }, 1000 * 3);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          {InterviewModeComment.break}
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default BreakModeController;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000031;
`;

const StyledComment = styled.strong`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 400;
`;
