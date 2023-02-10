import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  interviewQuestionTotalAtom,
} from "store/interview/atom";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";

const AnswerModeController = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);
  const interviewQuestionTotal = useRecoilValue(interviewQuestionTotalAtom);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setInterviewMode(
        interviewQuestionNumber >= interviewQuestionTotal
          ? "finished"
          : "break",
      );
    }, 1000 * 3); // ? STT 기능 추가하면 버퍼 시간 필요할 듯

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          {InterviewModeComment.answer}
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default AnswerModeController;

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
