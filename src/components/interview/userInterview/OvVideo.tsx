import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewStartAtom } from "store/interview/atom";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const host = useRecoilValue(hostAtom);

  const [isHost, setIsHost] = useState(false);
  const interviewerVideoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && interviewerVideoRef) {
      streamManager.addVideoElement(interviewerVideoRef.current);
      setIsHost(host === streamManager.stream.connection.connectionId);
    }
  }, [streamManager, interviewerVideoRef]);

  return (
    <StyledOpenViduVideoComponent isInterviewStart={isInterviewStart} isHost={isHost}>
      <video autoPlay={true} ref={interviewerVideoRef} />
    </StyledOpenViduVideoComponent>
  );
};

interface StyledOpenViduVideoComponentProps {
  isInterviewStart: boolean;
  isHost: boolean;
}

const StyledOpenViduVideoComponent = styled.div<StyledOpenViduVideoComponentProps>`
  ${({ isInterviewStart, isHost }) =>
    isInterviewStart && isHost
      ? css`
          video {
            width: 900px;
          }
        `
      : isHost
      ? css`
          height: 750px;
          video {
            width: 1000px;
          }
        `
      : css`
          height: ${isInterviewStart ? "180px" : "250px"};
          video {
            height: ${isInterviewStart ? "180px" : "250px"};
          }
        `}
`;

export default OpenViduVideoComponent;
