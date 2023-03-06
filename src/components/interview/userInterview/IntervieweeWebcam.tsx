import { useState, useRef, useEffect } from "react";

import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";

import styled from "@emotion/styled";

type IntervieweeWebcamProps = {
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
};

const IntervieweeWebcam = (props: IntervieweeWebcamProps) => {
  const { setVideo } = props;

  const webcamRef = useRef<null | Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [isWebcamReady, webcamRef]);

  return (
    <StyledWebcamWrap>
      {!isWebcamReady && <Skeleton variant="rectangular" width={1000} height={750} />}
      <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
    </StyledWebcamWrap>
  );
};

const StyledWebcamWrap = styled.div`
  width: 1000px;
  height: 750px;

  video {
    width: 1000px;
    height: 750px;
  }
`;

export default IntervieweeWebcam;
