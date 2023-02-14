import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  interviewQuestionTotalAtom,
} from "store/interview/atom";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";
import useCheckIrisPosition from "hooks/useCheckIrisPosition";
import useIrisAssessment from "hooks/useIrisAssessment";

import { InterviewModeComment, ANSWER_LIMIT_SECONDS } from "constants/interview";
import InterviewComment from "../InterviewComment";
import InterviewAiTimer from "../InterviewAiTimer";
import InterviewFeedback from "components/interview/InterviewFeedback";

import styled from "@emotion/styled";

type AnswerModeControllerProps = {
  video: HTMLVideoElement;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

const AnswerModeController = (props: AnswerModeControllerProps) => {
  const {
    video,
    canvasRef,
  } = props;

  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);
  const interviewQuestionTotal = useRecoilValue(interviewQuestionTotalAtom);
  const [ countDown, setCountDown ] = useState(ANSWER_LIMIT_SECONDS);

  const {
    face,
    setIsDetectionOn,
  } = useFaceLandmarksDetection({
    video,
    canvasRef,
    isDebugging: false,
  });

  const {
    horizontalRatio,
  } = useCheckIrisPosition({
    face,
  });

  const {
    showFeedback: showIrisFeedback,
  } = useIrisAssessment({
    isRealtimeMode: true,
    horizontalRatio,
  });

  const goToNextQuestion = () => {
    setIsDetectionOn(false);
    setInterviewMode(
      interviewQuestionNumber >= interviewQuestionTotal
        ? "finished"
        : "break",
    );
  };

  useEffect(() => {
    setIsDetectionOn(true);

    const timerId = window.setTimeout(() => {
      goToNextQuestion();
    }, 1000 * ANSWER_LIMIT_SECONDS); // ? STT 기능 추가하면 버퍼 시간 필요할 듯

    const intervalId = window.setInterval(() => {
      return setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledFlex>
          <StyledComment>
            {InterviewModeComment.answer}
          </StyledComment>
          <StyledTimer>
            <span>남은 시간: {countDown >= 0 ? countDown : 0}초</span>
            <InterviewAiTimer sec={ANSWER_LIMIT_SECONDS} />
          </StyledTimer>
        </StyledFlex>
      </InterviewComment>

      {showIrisFeedback && (
        <InterviewFeedback feedbackType="iris" />
      )}
      <InterviewFeedback feedbackType="motion" />
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
`;

const StyledFlex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 23px;
  box-sizing: border-box;
`;

const StyledComment = styled.strong`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
`;

const StyledTimer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  & span {
    margin-right: 10px;
    color: var(--font-gray);
    font-weight: 400;
    font-size: 14px;
  }
`;

const StyledNextButton = styled.button`
  width: 200px;
  height: 124px;
  font-size: 14px;
  text-align: center;
  background-color: var(--main-orange);
  color: var(--main-white);

  &:hover {
    background-color: var(--light-orange);
  }
  &:hover {
    background-color: var(--push-orange);
  }
`;
