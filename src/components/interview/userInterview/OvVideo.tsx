import styled from "@emotion/styled";
import { useEffect } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewStartAtom } from "store/interview/atom";
import { useState } from "react";

interface OpenViduVideoComponentProps {
  streamManager: any;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager, videoRef } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const host = useRecoilValue(hostAtom);

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
      setIsHost(host === streamManager.stream.connection.connectionId);
    }
  }, [streamManager, videoRef]);

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
