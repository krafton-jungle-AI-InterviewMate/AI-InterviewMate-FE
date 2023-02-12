import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { motionSnapshotAtom } from "store/interview/atom";

import useInitializeInterviewState from "hooks/useInitializeInterviewState";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";

import Webcam from "react-webcam";
import ai from "static/images/robot.jpg";
import NameTag from "components/interview/InterviewNameTag"; // TODO: 파일 위치 및 이름 변경
import Skeleton from "@mui/material/Skeleton";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { commonButtonStyle } from "styles/common";

const InterviewReady = () => {
  const navigate = useNavigate();
  const {
    initializeInterviewState,
  } = useInitializeInterviewState();

  const webcamRef = useRef<null | Webcam>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const [ isWebcamReady, setIsWebcamReady ] = useState(false);
  const [ video, setVideo ] = useState<null | HTMLVideoElement>(null);
  const [ disableGoButton, setDisableGoButton ] = useState(true);

  const setMotionSnapshot = useSetRecoilState(motionSnapshotAtom);

  useEffect(() => {
    if (isWebcamReady && webcamRef.current) {
      setVideo(webcamRef.current.video);
    }
  }, [ isWebcamReady, webcamRef ]);

  const {
    isVideoReady,
    setNewDetector,
    face,
  } = useFaceLandmarksDetection({
    video,
    canvasRef,
    isDebugging: true,
  });

  useEffect(() => {
    if (isWebcamReady && isVideoReady) {
      setDisableGoButton(false);
    }
  }, [ isWebcamReady, isVideoReady ]);

  const handleCancelButton = () => {
    // TODO: 컨펌 팝업
    navigate("/lobby");
  };

  const handleGoButton = async () => {
    setDisableGoButton(true);
    initializeInterviewState();
    await setNewDetector();
  };

  useEffect(() => {
    if (face) {
      setMotionSnapshot(face);
      navigate("/interview/ai");
    }
  }, [ face ]);

  return (
    <StyledWrapper>
      <StyledReadyContainer>
        <StyledProfile>
          <StyledVideoWrap>
            {!isWebcamReady && (
              <Skeleton variant="rectangular" width={272} height={204} />
            )}
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
      </StyledReadyContainer>

      <StyledFlexContainer>
        <StyledButtonBox>
          <StyledCancelButton type="button" onClick={handleCancelButton}>
            면접 취소하기
          </StyledCancelButton>
          <StyledGoButton type="button" onClick={handleGoButton} disabled={disableGoButton}>
            GO
            <StyledInformation>
              <AiOutlineInfoCircle size={24} />
              <small>
                참가 면접관이 모두 READY 상태여야
                <br />
                면접을 시작할 수 있습니다.
              </small>
            </StyledInformation>
          </StyledGoButton>
        </StyledButtonBox>
      </StyledFlexContainer>
    </StyledWrapper>
  );
};

export default InterviewReady;

const StyledWrapper = styled.section`
  width: 1000px;
`;

const StyledReadyContainer = styled.div`
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

const StyledFlexContainer = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  margin-top: 160px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 430px;
`;

const StyledCancelButton = styled.button`
  ${commonButtonStyle}
  background-color: var(--main-white);
  border: 1px solid var(--main-black);

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
    border-color: transparent;
  }
  &:active {
    background-color: var(--push-alert);
  }
`;

const StyledGoButton = styled.button`
  position: relative;
  ${commonButtonStyle}
  background-color: var(--main-orange);
  margin-left: 28px;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

const StyledInformation = styled.div`
  position: absolute;
  left: 0;
  bottom: -40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 216px;
  color: var(--font-gray);

  & small {
    display: block;
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-left: 4px;
  }
`;
