import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { isInterviewStartAtom } from "store/interview/atom";

interface OpenViduVideoComponentProps {
  streamManager: any;
  isInterviewer: boolean;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager, isInterviewer } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [ streamManager ]);

  return (
    <StyledOpenViduVideoComponent isInterviewer={isInterviewer} isInterviewStart={isInterviewStart}>
      <video autoPlay={true} ref={videoRef} />
    </StyledOpenViduVideoComponent>
  );
};

interface StyledOpenViduVideoComponentProps {
  isInterviewer: boolean;
  isInterviewStart: boolean;
}

const StyledOpenViduVideoComponent = styled.div<StyledOpenViduVideoComponentProps>`
  video {
    width: ${props =>
    props.isInterviewStart && !props.isInterviewer
      ? "1000px"
      : props.isInterviewer
        ? "250px"
        : "272px"};
    height: ${props =>
    props.isInterviewStart && !props.isInterviewer
      ? "667px"
      : props.isInterviewer
        ? "180px"
        : "204px"};
  }
`;

export default OpenViduVideoComponent;
