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
import useCheckHeadMotion from "hooks/useCheckHeadMotion";
import useMotionAssessment from "hooks/useMotionAssessment";

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
    isBadMotion,
  } = useCheckHeadMotion({
    face,
  });

  const {
    showFeedback: showIrisFeedback,
  } = useIrisAssessment({
    isRealtimeMode: true,
    horizontalRatio,
  });
  const {
    showFeedback: showMotionFeedback,
  } = useMotionAssessment({
    isRealtimeMode: true,
    isBadMotion,
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
    }, 1000 * ANSWER_LIMIT_SECONDS);

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
      {showMotionFeedback && (
        <InterviewFeedback feedbackType="motion" />
      )}

      <StyledNextButton type="button" onClick={goToNextQuestion}>
        다음으로 넘어가기
        <StyledSmall>
          답변을 완료하셨다면,
        </StyledSmall>
      </StyledNextButton>
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
  position: absolute;
  top: 50%;
  right: 60px;
  width: 100px;
  height: 100px;
  font-size: 14px;
  text-align: center;
  background-color: var(--main-orange);
  color: var(--main-white);
  border-radius: 999px;
  transition: 0.2s;

  &:hover {
    background-color: var(--light-orange);
  }
  &:hover {
    background-color: var(--push-orange);
  }
`;

const StyledSmall = styled.small`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 120px;
  color: var(--font-gray);
  opacity: 0.5;
  font-size: 12px;
`;
