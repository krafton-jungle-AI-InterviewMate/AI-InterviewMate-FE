import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const StyledOpenViduVideoComponent = styled.div`
  video {
    width: 272px;
    height: 204px;
  }
`;

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <StyledOpenViduVideoComponent>
      <video autoPlay={true} ref={videoRef} />
    </StyledOpenViduVideoComponent>
  );
};

export default OpenViduVideoComponent;
