import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

type InterviewAiTimerProps = {
  sec: number;
};

const InterviewAiTimer = (props: InterviewAiTimerProps) => {
  const {
    sec,
  } = props;

  return (
    <StyledClock>
      <StyledSecond sec={sec} />
    </StyledClock>
  );
};

export default InterviewAiTimer;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledClock = styled.div`
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background-color: var(--main-white);
  border: 1px solid var(--main-orange);
`;

const StyledSecond = styled.div<{ sec: number }>`
  ${({ sec }) => css`
    animation: ${sec}s ${rotation} linear;
  `}
  transform-origin: 50% 100%;

  position: absolute;
  top: 4px;
  left: calc(50% - 1px);
  width: 2px;
  height: calc(50% - 3px);
  border-radius: 3px;
  background-color: var(--main-orange);
`;

