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
    <div>
      <StyledClock>
        <StyledSecond sec={sec} />
      </StyledClock>
    </div>
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
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background-color: var(--main-orange);
`;

const StyledSecond = styled.div<{ sec: number }>`
  ${({ sec }) => css`
    animation: ${sec}s ${rotation} linear;
  `}
  transform-origin: 50% 100%;

  position: absolute;
  top: 4px;
  left: calc(50% - 1px);
  width: 3px;
  height: calc(50% - 4px);
  border-radius: 3px;
  background-color: var(--main-white);
  box-shadow: 0px 4px 14px 3px var(--main-white);
`;

