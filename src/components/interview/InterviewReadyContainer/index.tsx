import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import ai from "static/images/robot.jpg";
import NameTag from "./NameTag";

import { BsThreeDots } from "react-icons/bs";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InterviewReadyContainer = () => {
  const webcamRef = useRef<null | Webcam>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const [ isWebcamReady, setIsWebcamReady ] = useState(false);

  useEffect(() => {
    if (isWebcamReady) {
      // (async () => {
      //   await loadFacemesh();
      // })();
      console.log("TODO: face mesh");
    }
  }, [ isWebcamReady ]);

  return (
    <StyledContainer>
      <StyledProfile>
        <StyledVideoWrap>
          <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
          <StyledCanvas ref={canvasRef} />
        </StyledVideoWrap>
        <NameTag role="interviewee" profileName="김기태님" />
      </StyledProfile>

      <BsThreeDots size={60} />

      <StyledProfile>
        <StyledImageWrap>
          <img src={ai} alt="AI 면접관" />
        </StyledImageWrap>
        <NameTag role="interviewer" profileName="AI" />
      </StyledProfile>
    </StyledContainer>
  );
};

export default InterviewReadyContainer;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  & dl {
    margin-top: 49px;
  }
  & dd {
    margin-left: 0;
  }
`;

const commonStyle = css`
  position: relative;
  text-align: center;
  z-index: 9;
  width: 272px;
  height: 204px;
`;

const wrapStyle = css`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

const StyledVideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);

  & video {
    ${commonStyle}
  }
`;

const StyledCanvas = styled.canvas`
  ${commonStyle}
  position: absolute;
  left: 0;
  right: 0;

  /* border: 2px dashed gray; */
`;

const StyledImageWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}

  & img {
    width: 100%;
  }
`;
