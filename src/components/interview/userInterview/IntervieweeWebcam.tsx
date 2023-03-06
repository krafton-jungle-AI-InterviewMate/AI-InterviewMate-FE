import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isInterviewStartAtom } from "store/interview/atom";

import Webcam from "react-webcam";
import Skeleton from "@mui/material/Skeleton";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

type IntervieweeWebcamProps = {
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
};

const IntervieweeWebcam = (props: IntervieweeWebcamProps) => {
  const { setVideo } = props;

  const isInterviewStart = useRecoilValue(isInterviewStartAtom);

  const webcamRef = useRef<null | Webcam>(null);
  const [ isWebcamReady, setIsWebcamReady ] = useState(false);

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [ isWebcamReady, webcamRef ]);

  return (
    <StyledWebcamWrap isInterviewStart={isInterviewStart}>
      {!isWebcamReady && (
        <Skeleton variant="rectangular" width={1000} height={750} />
      )}
      <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
    </StyledWebcamWrap>
  );
};

interface StyledOpenViduVideoComponentProps {
  isInterviewStart: boolean;
}

const StyledWebcamWrap = styled.div<StyledOpenViduVideoComponentProps>`
  ${({ isInterviewStart }) =>
    isInterviewStart
      ? css`
          video {
            width: 900px;
          }
        `
      : css`
          height: 750px;
          video {
            width: 1000px;
          }
        `}
`;

export default IntervieweeWebcam;
