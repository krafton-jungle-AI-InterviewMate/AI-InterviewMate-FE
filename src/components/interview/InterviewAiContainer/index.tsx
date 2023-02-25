import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionTotalAtom,
  answerScriptAtom,
} from "store/interview/atom";

import {
  BreakModeController,
  QuestionModeController,
  AnswerModeController,
  FinishedModeController,
} from "./InterviewAiController";
import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";

import useSTT from "hooks/useSTT";
import useInitializeSynthesizer from "hooks/useInitializeSynthesizer";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

// ! TODO: 질문 fetching API 연동 이후 제거
import questions from "../_mock/questions";

const InterviewAiContainer = () => {
  const interviewMode = useRecoilValue(interviewModeAtom);
  const setInterviewQuestionTotal = useSetRecoilState(interviewQuestionTotalAtom);
  const setAnswerScript = useSetRecoilState(answerScriptAtom);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const webcamRef = useRef<null | Webcam>(null);
  const [ isWebcamReady, setIsWebcamReady ] = useState(false);
  const [ video, setVideo ] = useState<null | HTMLVideoElement>(null);

  const [ synthesizer, setSynthesizer ] = useState<null | SpeechSynthesizer>(null);

  useSTT();
  const {
    player,
    initializeSynthesizer,
  } = useInitializeSynthesizer();

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [ isWebcamReady, webcamRef ]);

  useEffect(() => {
    (async () => {
      const synth = await initializeSynthesizer();
      setSynthesizer(synth);
    })();

    // ! FIXME: 질문 fetching API 연동 이후 실제 질문 개수로 세팅
    setInterviewQuestionTotal(questions.length);
    setAnswerScript(new Array(questions.length).fill(""));
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

      {isWebcamReady && video && synthesizer && (
        <>
          {interviewMode === "break" && (
            <BreakModeController />
          )}
          {interviewMode === "question" && (
            <QuestionModeController
              questionList={questions}
              synthesizer={synthesizer}
              player={player}
            />
          )}
          {interviewMode === "answer" && (
            <AnswerModeController video={video} canvasRef={canvasRef} />
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
