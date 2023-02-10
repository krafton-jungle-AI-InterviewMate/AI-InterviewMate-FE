import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionTotalAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import {
  BreakModeController,
  QuestionModeController,
  AnswerModeController,
  FinishedModeController,
} from "./InterviewAiController";
import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

// ! TODO: 질문 fetching API 연동 이후 제거
import questions from "../_mock/questions";

const InterviewAiContainer = () => {
  const interviewMode = useRecoilValue(interviewModeAtom);
  const setInterviewQuestionTotal = useSetRecoilState(interviewQuestionTotalAtom);
  const setInterviewQuestionNumber = useSetRecoilState(interviewQuestionNumberAtom);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const webcamRef = useRef<null | Webcam>(null);
  const [ isWebcamReady, setIsWebcamReady ] = useState(false);

  useEffect(() => {
    if (isWebcamReady) {
      // (async () => {
      //   await loadFacemesh();
      // })();
      console.log("TODO: face mesh");
    }
  }, [ isWebcamReady ]);

  useEffect(() => {
    setInterviewQuestionNumber(0); // 질문 리스트 인덱스 초기화

    // ! FIXME: 질문 fetching API 연동 이후 실제 질문 개수로 세팅
    setInterviewQuestionTotal(questions.length);
  }, []);

  return (
    <StyledWrap>
      <StyledVideoWrap>
        {!isWebcamReady && (
          <Skeleton variant="rectangular" width={640} height={480} />
        )}
        <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
        <StyledCanvas ref={canvasRef} />
      </StyledVideoWrap>

      {isWebcamReady && (
        <>
          {interviewMode === "break" && (
            <BreakModeController />
          )}
          {interviewMode === "question" && (
            <QuestionModeController questionList={questions} />
          )}
          {interviewMode === "answer" && ( // ! TODO: face detection 담당
            <AnswerModeController />
          )}
          {interviewMode === "finished" && (
            <FinishedModeController />
          )}
        </>
      )}
    </StyledWrap>
  );
};

export default InterviewAiContainer;

const StyledWrap = styled.section`
  width: 100%;
  min-height: calc(100vh - 170px);
  margin-top: 20px;
  position: relative;
`;

const commonStyle = css`
  position: relative;
  text-align: center;
  width: 640px;
  height: 480px;
`;

const wrapStyle = css`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

const StyledVideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  margin: 0 auto;
  padding-top: 70px;

  & video {
    ${commonStyle}
  }
`;

const StyledCanvas = styled.canvas`
  ${commonStyle}
  position: absolute;
  left: 0;
  right: 0;
`;
