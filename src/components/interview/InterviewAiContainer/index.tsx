import { useEffect, useRef, useState, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionTotalAtom,
  interviewQuestionNumberAtom,
  answerScriptAtom,
  aiInterviewerAtom,
  aiRoomResponseAtom,
  recordModeAtom,
} from "store/interview/atom";

import {
  BreakModeController,
  QuestionModeController,
  AnswerModeController,
  FinishedModeController,
} from "./InterviewAiController";
import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";
import { JungleManagersSet, AI_VIDEO_WIDTH } from "constants/interview";
import { getAiInterviewerVideo, getAiInterviewerListening } from "lib/interview";

import useSTT from "hooks/useSTT";
import { useRecorderPermission } from "hooks/useRecorderPermission";
import RecordRTC from "recordrtc";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InterviewAiContainer = () => {
  const interviewMode = useRecoilValue(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);
  const setInterviewQuestionTotal = useSetRecoilState(interviewQuestionTotalAtom);
  const setAnswerScript = useSetRecoilState(answerScriptAtom);
  const aiInterviewer = useRecoilValue(aiInterviewerAtom);
  const aiRoomResponse = useRecoilValue(aiRoomResponseAtom);
  const isRecordMode = useRecoilValue(recordModeAtom);

  const webcamRef = useRef<null | Webcam>(null);
  const [ isWebcamReady, setIsWebcamReady ] = useState(false);
  const [ video, setVideo ] = useState<null | HTMLVideoElement>(null);
  const [ recorder, setRecorder ] = useState<null | RecordRTC.RecordRTCPromisesHandler>();

  const aiInterviewerVideo = useMemo(() => getAiInterviewerVideo(aiInterviewer), [ aiInterviewer ]);
  const aiInterviewerListening = useMemo(() => getAiInterviewerListening(aiInterviewer), [ aiInterviewer ]);
  const videoClassName = useMemo(() => JungleManagersSet.has(aiInterviewer) ? "jungle" : "", [ aiInterviewer ]);

  useSTT();

  const {
    getPermissionInitializeRecorder,
  } = useRecorderPermission("video");

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob = await recorder.getBlob();
      // RecordRTC.invokeSaveAsDialog(blob, `interview${interviewQuestionNumber}.webm`);
      console.log(blob); // TODO: POST /result req body에 포함
    }
  };

  useEffect(() => {
    if (isRecordMode) {
      (async () => {
        const rec = await getPermissionInitializeRecorder();
        await rec.startRecording();
  
        setRecorder(rec);
      })();
  
      return (() => {
        recorder?.destroy();
      });
    }
  }, []);

  useEffect(() => {
    if (interviewMode === "finished" && isRecordMode) {
      (async () => {
        await stopRecording();
      })();
    }
  }, [ interviewMode ]);

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [ isWebcamReady, webcamRef ]);

  useEffect(() => {
    if (aiRoomResponse) {
      const {
        data: {
          questionList,
        },
      } = aiRoomResponse;

      setInterviewQuestionTotal(questionList.length);
      setAnswerScript(new Array(questionList.length).fill(""));
    }
  }, [ aiRoomResponse ]);

  return aiRoomResponse ? (
    <StyledWrap>
      <StyledVideoSection>
        <StyledVideoWrap>
          {!isWebcamReady && (
            <Skeleton variant="rectangular" width={640} height={480} />
          )}
          <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
        </StyledVideoWrap>
        <StyledAiVideoWrap>
          {interviewMode === "question" ? (
            <video
              width={AI_VIDEO_WIDTH}
              autoPlay
              loop
              muted
              key={aiInterviewerVideo}
              className={videoClassName}
            >
              <source src={aiInterviewerVideo} type="video/mp4" />
            </video>
          ) : (
            <video
              width={AI_VIDEO_WIDTH}
              autoPlay
              loop
              muted
              key={aiInterviewerListening}
              className={videoClassName}
            >
              <source src={aiInterviewerListening} type="video/mp4" />
            </video>
          )}
          <video
            width={AI_VIDEO_WIDTH}
            autoPlay={false}
            muted
            key={aiInterviewerListening + "_fallback"}
            className={`${videoClassName} fallback`}
          >
            <source src={aiInterviewerListening} type="video/mp4" />
          </video>
        </StyledAiVideoWrap>
      </StyledVideoSection>

      {isWebcamReady && video && (
        <>
          {interviewMode === "break" && (
            <BreakModeController />
          )}
          {interviewMode === "question" && (
            <QuestionModeController
              questionList={aiRoomResponse.data.questionList}
            />
          )}
          {interviewMode === "answer" && (
            <AnswerModeController video={video} />
          )}
          {interviewMode === "finished" && (
            <FinishedModeController />
          )}
        </>
      )}
    </StyledWrap>
  ) : null;
};

export default InterviewAiContainer;

const StyledWrap = styled.section`
  width: 100%;
  min-height: calc(100vh - 120px);
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

const StyledVideoSection = styled.section`
  max-width: 1440px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  margin: 0 auto;
`;

const StyledAiVideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  background-color: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  margin: 0 auto;
  margin-top: 140px;
  border: 1px solid var(--main-gray);

  & video {
    ${commonStyle}
    border-radius: 16px;
    z-index: 11;
  }

  & video.fallback {
    position: absolute;
    left: 0;
    z-index: 10;
  }
`;

const StyledVideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  background-color: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  margin: 0 auto;
  margin-top: 140px;
  border: 1px solid var(--main-gray);

  & video {
    ${commonStyle}
  }
`;
