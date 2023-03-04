import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hostAtom, isInterviewStartAtom, userInterviewHostVideoAtom } from "store/interview/atom";
import { useState } from "react";

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const host = useRecoilValue(hostAtom);
  const setHostVideo = useSetRecoilState(userInterviewHostVideoAtom);

  const [isHost, setIsHost] = useState(false);

  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
      setIsHost(host === streamManager.stream.connection.connectionId);
      if (host === streamManager.stream.connection.connectionId && videoRef.current) {
        setHostVideo(videoRef.current);
      }
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
