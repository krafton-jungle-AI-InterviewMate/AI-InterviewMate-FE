import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";

type QuestionModeControllerProps = {
  questionList: string[];
};

const QuestionModeController = (props: QuestionModeControllerProps) => {
  const {
    questionList,
  } = props;

  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const [ interviewQuestionNumber, setInterviewQuestionNumber ] = useRecoilState(interviewQuestionNumberAtom);

  // ! FIXME: 실제로는 음성 플레이 종료 시점을 기준으로 인터뷰 모드 변경
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setInterviewMode("answer");
      setInterviewQuestionNumber((curr) => curr + 1);
    }, 1000 * 5);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  console.log(interviewQuestionNumber);

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
  color: var(--main-black);

  & span {
    font-weight: 700;
    margin-right: 20px;
  }
`;
