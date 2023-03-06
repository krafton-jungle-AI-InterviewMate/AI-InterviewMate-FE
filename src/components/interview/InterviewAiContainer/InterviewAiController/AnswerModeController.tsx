import { useEffect, useState, useMemo } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  interviewQuestionTotalAtom,
  feedbackAtom,
} from "store/interview/atom";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";
import useCheckIrisPosition from "hooks/useCheckIrisPosition";
import useIrisAssessment from "hooks/useIrisAssessment";

import { InterviewModeComment, ANSWER_LIMIT_SECONDS } from "constants/interview";
import InterviewComment from "../InterviewComment";
import InterviewAiTimer from "../InterviewAiTimer";

import styled from "@emotion/styled";
import useCheckHeadMotion from "hooks/useCheckHeadMotion";
import useMotionAssessment from "hooks/useMotionAssessment";

type AnswerModeControllerProps = {
  video: HTMLVideoElement;
};

const AnswerModeController = (props: AnswerModeControllerProps) => {
  const {
    video,
  } = props;

  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const interviewQuestionNumber = useRecoilValue(interviewQuestionNumberAtom);
  const interviewQuestionTotal = useRecoilValue(interviewQuestionTotalAtom);
  const feedbackMode = useRecoilValue(feedbackAtom);
  const [ countDown, setCountDown ] = useState(ANSWER_LIMIT_SECONDS);

  const isRealtimeMode = useMemo(() => feedbackMode === "ON", [ feedbackMode ]);

  const {
    face,
    setIsDetectionOn,
  } = useFaceLandmarksDetection({
    video,
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

  useIrisAssessment({
    isRealtimeMode,
    horizontalRatio,
  });
  useMotionAssessment({
    isRealtimeMode,
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
  font-size: 28px;
  font-weight: 400;
`;

const StyledTimer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  & span {
    margin-right: 10px;
    color: var(--main-black);
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

const StyledNextButton = styled.button`
  position: absolute;
  top: -60px;
  right: 60px;
  width: 160px;
  height: 160px;
  font-size: 1.4rem;
  text-align: center;
  background: linear-gradient(90deg, var(--push-orange), transparent) var(--light-orange);
  place-content: center;
  color: var(--main-white);
  border-radius: 999px;
  transition: all 300ms;

  &:hover {
    background-color: var(--light-blue);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

const StyledSmall = styled.small`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  color: var(--font-gray);
  font-size: 1.4rem;
`;
