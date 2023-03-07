import { useState, useRef, useEffect } from "react";

import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";

import styled from "@emotion/styled";
import InterviewAlertBox from "../InterviewAlertBox";
import { useRecoilValue } from "recoil";
import { isInterviewStartAtom } from "store/interview/atom";

type IntervieweeWebcamProps = {
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
};

const IntervieweeWebcam = (props: IntervieweeWebcamProps) => {
  const { setVideo } = props;
  const isInterviewStart = useRecoilValue(isInterviewStartAtom);

  const webcamRef = useRef<null | Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [isWebcamReady, webcamRef]);

  return (
    <StyledWebcamWrap isInterviewStart={isInterviewStart}>
      {!isWebcamReady && <Skeleton variant="rectangular" width={1000} height={750} />}
      <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
      <InterviewAlertBox webcamWidth={1000} webcamHeight={750} />
    </StyledWebcamWrap>
  );
};

interface StyledWebcamWrapProps {
  isInterviewStart: boolean | unknown;
}

const StyledWebcamWrap = styled.div<StyledWebcamWrapProps>`
  width: 1000px;
  height: ${props => (props.isInterviewStart ? "800px" : "")};

  video {
    position: relative;
    top: ${props => (props.isInterviewStart ? "0" : "7px")};
    z-index: 10;
    width: 1000px;
    height: 750px;
  }
`;

export default IntervieweeWebcam;
