import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionTotalAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import {
  BreakModeController,
  QuestionModeController,
  AnswerModeController,
  FinishedModeController,
} from "./InterviewAiController";

import styled from "@emotion/styled";

// ! TODO: 질문 fetching API 연동 이후 제거
import questions from "../_mock/questions";

const InterviewAiContainer = () => {
  const interviewMode = useRecoilValue(interviewModeAtom);
  const setInterviewQuestionTotal = useSetRecoilState(interviewQuestionTotalAtom);
  const setInterviewQuestionNumber = useSetRecoilState(interviewQuestionNumberAtom);

  useEffect(() => {
    setInterviewQuestionNumber(0); // 질문 리스트 인덱스 초기화

    // ! FIXME: 질문 fetching API 연동 이후 실제 질문 개수로 세팅
    setInterviewQuestionTotal(questions.length);
  }, []);

  return (
    <StyledWrap>
      <p>
        TODO: 사용자 영상 영역
      </p>
      {interviewMode === "break" && (
        <BreakModeController />
      )}
      {interviewMode === "question" && (
        <QuestionModeController questionList={questions} />
      )}
      {interviewMode === "answer" && (
        <AnswerModeController />
      )}
      {interviewMode === "finished" && (
        <FinishedModeController />
      )}
    </StyledWrap>
  );
};

export default InterviewAiContainer;

const StyledWrap = styled.section`
  width: 100%;
  min-height: calc(100vh - 170px);
  position: relative;
`;
