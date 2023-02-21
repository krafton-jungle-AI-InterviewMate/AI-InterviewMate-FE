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
      {feedbackType === "iris" && <AiOutlineEye size={32} />}
      {feedbackType === "motion" && <GrUserManager size={32} />}
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
  left: 160px;
  transform: translate(-50%, 0);
  width: 254px;
  height:  124px;
  background-color: var(--main-alert);
  color: var(--main-white);
  border-radius: 16px;

  ${({ feedbackType }) => feedbackType === "iris" && css`
    top: 100px;
  `}
  ${({ feedbackType }) => feedbackType === "motion" && css`
    top: 240px;
  `}

  & p {
    width: 160px;
    font-size: 24px;
    line-height: 1.5;
    font-weight: 500;
    word-break: keep-all;
  }
  & path {
    color: var(--main-white);
    stroke: var(--main-white);
  }
`;
