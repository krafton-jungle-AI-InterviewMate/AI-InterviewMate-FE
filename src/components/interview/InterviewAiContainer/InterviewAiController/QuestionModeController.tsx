import { useRecoilValue } from "recoil";
import { interviewQuestionNumberAtom } from "store/interview/atom";

import useAzureTTS, { UseAzureTTSParams } from "hooks/useAzureTTS";

import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";

type QuestionModeControllerProps = UseAzureTTSParams;

const QuestionModeController = (props: QuestionModeControllerProps) => {
  const { questionList } = props;

  const interviewQuestionNumber = useRecoilValue(
    interviewQuestionNumberAtom,
  );

  useAzureTTS(props);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          <span>Q.</span>
          {questionList[interviewQuestionNumber].questionTitle}
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
  font-size: 28px;
  font-weight: 400;
  color: var(--main-black);

  & span {
    font-weight: 700;
    margin-right: 20px;
  }
`;
