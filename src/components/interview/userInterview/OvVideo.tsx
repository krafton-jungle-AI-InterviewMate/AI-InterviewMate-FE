import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { hostAtom, isInterviewerAtom, isInterviewStartAtom } from "store/interview/atom";
import { useState } from "react";
import Loading from "components/common/Loading";

interface OpenViduVideoComponentProps {
  streamManager: any;
  setVideo: (video: HTMLVideoElement) => void;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager, setVideo } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const host = useRecoilValue(hostAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);

  const [isHost, setIsHost] = useState(false);

  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
      setIsHost(host === streamManager.stream.connection.connectionId);
      if (
        host === streamManager.stream.connection.connectionId &&
        videoRef.current &&
        !isInterviewer
      ) {
        setVideo(videoRef.current);
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
