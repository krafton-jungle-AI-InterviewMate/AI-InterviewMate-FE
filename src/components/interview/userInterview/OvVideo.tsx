import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

interface OpenViduVideoComponentProps {
  streamManager: any;
}

const OpenViduVideoComponent = (props: OpenViduVideoComponentProps) => {
  const { streamManager } = props;
  const videoRef = useRef(null);
  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <StyledOpenViduVideoComponent>
      <video autoPlay={true} ref={videoRef} />
    </StyledOpenViduVideoComponent>
  );
};

const StyledOpenViduVideoComponent = styled.div`
  video {
    width: 272px;
    height: 204px;
  }
`;

export default OpenViduVideoComponent;
