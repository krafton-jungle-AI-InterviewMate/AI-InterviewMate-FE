import { useRecoilValue } from "recoil";
import { showIrisFeedbackAtom, showMotionFeedbackAtom } from "store/interview/atom";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

type InterviewAlertBoxProps = {
  webcamWidth: number;
  webcamHeight: number;
};

const InterviewAlertBox = (props: InterviewAlertBoxProps) => {
  const { webcamWidth, webcamHeight } = props;

  const showIrisFeedback = useRecoilValue(showIrisFeedbackAtom);
  const showMotionFeedback = useRecoilValue(showMotionFeedbackAtom);

  return (
    <>
      <StyledInterviewAlertBox
        w={webcamWidth}
        h={webcamHeight}
        alertType={showIrisFeedback ? "eyes" : "none"}
        isBoth={showIrisFeedback && showMotionFeedback}
      >
        <StyledAlertText alertType={showIrisFeedback ? "eyes" : "none"}>
          👁 시선 이탈
        </StyledAlertText>
      </StyledInterviewAlertBox>

      <StyledInterviewAlertBox
        w={webcamWidth}
        h={webcamHeight}
        alertType={showMotionFeedback ? "attitude" : "none"}
      >
        <StyledAlertText alertType={showMotionFeedback ? "attitude" : "none"}>
          🙅 자세 이탈
        </StyledAlertText>
      </StyledInterviewAlertBox>
    </>
  );
};

export default InterviewAlertBox;

type AlertBoxProps = {
  w: number;
  h: number;
  alertType: "eyes" | "attitude" | "none";
  isBoth?: boolean;
};

const StyledInterviewAlertBox = styled.div<AlertBoxProps>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-20px, -20px);
  width: ${({ w }) => `${w}px`};
  height: ${({ h }) => `${h}px`};
  padding: 20px;
  border-radius: 20px;
  z-index: 9;

  ${({ alertType }) =>
    alertType === "eyes" &&
    css`
      background: var(--main-orange);
      box-shadow: 0px 3px 24px 0px rgba(255, 153, 0, 1), 6px 0px 24px 0px rgba(255, 0, 0, 0.357);
    `};
  ${({ alertType }) =>
    alertType === "attitude" &&
    css`
      background: var(--main-blue);
      box-shadow: 0px 3px 24px 0px rgba(20, 110, 180, 1), 6px 0px 24px 0px rgba(36, 117, 131, 0.357);
    `};
  ${({ alertType }) =>
    alertType === "none" &&
    css`
      background: transparent;
      box-shadow: none;
    `};
  ${({ isBoth }) =>
    isBoth &&
    css`
      box-shadow: none;
    `};
`;

const StyledAlertText = styled.div<{ alertType: "eyes" | "attitude" | "none" }>`
  position: absolute;
  top: -60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80px;
  border-radius: 10px;
  font-size: 1.6rem;
  color: var(--main-white);

  ${({ alertType }) =>
    alertType === "eyes" &&
    css`
      background-color: var(--main-orange);
      box-shadow: 0px 3px 24px 0px rgba(255, 153, 0, 1), 6px 0px 24px 0px rgba(255, 0, 0, 0.357);
      left: 0;
    `};
  ${({ alertType }) =>
    alertType === "attitude" &&
    css`
      background-color: var(--main-blue);
      box-shadow: 0px 3px 24px 0px rgba(20, 110, 180, 1), 6px 0px 24px 0px rgba(36, 117, 131, 0.357);
      right: 0;
    `};
  ${({ alertType }) =>
    alertType === "none" &&
    css`
      background-color: transparent;
      color: transparent;
    `};
`;
