import { InterviewFeedbackTypes } from "types/interview";
import { InterviewFeedbackComment } from "constants/interview";

import { AiOutlineEye } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type InterviewFeedbackProps = {
  feedbackType: InterviewFeedbackTypes;
};

const InterviewFeedback = (props: InterviewFeedbackProps) => {
  const {
    feedbackType,
  } = props;

  return (
    <StyledWrap role="alert" feedbackType={feedbackType}>
      {feedbackType === "iris" && <AiOutlineEye size={36} />}
      {feedbackType === "motion" && <GrUserManager size={36} />}
      <p>{InterviewFeedbackComment[feedbackType]}</p>
    </StyledWrap>
  );
};

export default InterviewFeedback;

const StyledWrap = styled.div<InterviewFeedbackProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: -140px;
  transform: translate(-50%, 0);
  width: 280px;
  height: 84px;
  background-color: var(--main-black);
  color: var(--main-white);
  border-radius: 5px;

  ${({ feedbackType }) => feedbackType === "iris" && css`
    left: calc(50% - 160px);
  `}
  ${({ feedbackType }) => feedbackType === "motion" && css`
    left: calc(50% + 160px);
  `}

  & p {
    width: calc(100% - 120px);
    font-size: 20px;
    line-height: 1.5;
    font-weight: 500;
    word-break: keep-all;
  }
  & path {
    color: var(--main-white);
    stroke: var(--main-white);
  }
`;
