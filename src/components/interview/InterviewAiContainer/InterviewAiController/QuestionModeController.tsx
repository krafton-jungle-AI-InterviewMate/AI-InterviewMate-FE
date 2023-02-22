import { useEffect, useMemo } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";
import questions from "components/interview/_mock/questions";

type QuestionModeControllerProps = {
  questionList: string[];
};

const QuestionModeController = (props: QuestionModeControllerProps) => {
  const { questionList } = props;

  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(
    interviewQuestionNumberAtom,
  );

  const synth = window.speechSynthesis;

  useEffect(() => {
    const msg = new SpeechSynthesisUtterance(questions[interviewQuestionNumber]);
    msg.rate = 1;
    msg.pitch = 1.5;

    msg.onend = () => {
      setInterviewMode("answer");
      setInterviewQuestionNumber(curr => curr + 1);
    };

    synth.speak(msg);

    return () => {
      synth.cancel();
    };
  }, []);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          <span>Q.</span>
          {questionList[interviewQuestionNumber]}
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default QuestionModeController;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  color: var(--main-black);

  & span {
    font-weight: 700;
    margin-right: 20px;
  }
`;
