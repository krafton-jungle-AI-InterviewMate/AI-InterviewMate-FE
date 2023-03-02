import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewStartAtom } from "store/interview/atom";
import { useState } from "react";

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const host = useRecoilValue(hostAtom);

  const [isHost, setIsHost] = useState(false);

  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
      setIsHost(host === streamManager.stream.connection.connectionId);
    }
  }, [streamManager]);

  return (
    <StyledOpenViduVideoComponent isInterviewStart={isInterviewStart} isHost={isHost}>
      <video autoPlay={true} ref={videoRef} />
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
          height: 750px;
          video {
            width: 1000px;
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
          height: 250px;
          video {
            height: 250px;
          }
        `}
`;

export default OpenViduVideoComponent;
