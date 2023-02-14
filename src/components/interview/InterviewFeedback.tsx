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
      {feedbackType === "iris" && <AiOutlineEye />}
      {feedbackType === "motion" && <GrUserManager />}
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
  top: 100px;
  transform: translate(-50%, 0);
  width: 254px;
  height: 38px;
  background-color: #ff9900d6;
  border-radius: var(--button-border-radius);
  color: var(--main-white);

  ${({ feedbackType }) => feedbackType === "iris" && css`
    left: calc(50% - 140px);
  `}
  ${({ feedbackType }) => feedbackType === "motion" && css`
    left: calc(50% + 140px);
  `}

  & p {
    font-size: 14px;
  }
  & path {
    color: var(--main-white);
    stroke: var(--main-white);
  }
`;
