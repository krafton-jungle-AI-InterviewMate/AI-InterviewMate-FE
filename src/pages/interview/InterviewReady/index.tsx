import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { motionSnapshotAtom } from "store/interview/atom";

import useInitializeInterviewState from "hooks/useInitializeInterviewState";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";

import Webcam from "react-webcam";
import ai from "static/images/robot.jpg";
import NameTag from "components/interview/InterviewNameTag";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import * as Styled from "./style";

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
    setIsDetectionOn,
    updateFace,
    detector,
  } = useFaceLandmarksDetection({
    video,
    canvasRef,
    isDebugging: false,
    isOneOff: true,
  });

  useEffect(() => {
    if (isWebcamReady && isVideoReady) {
      setDisableGoButton(false);
    }
  }, [ isWebcamReady, isVideoReady ]);

  useEffect(() => {
    if (isVideoReady) {
      (async() => {
        await setNewDetector();
      })();
    }
  }, [ isVideoReady ]);

  const handleCancelButton = () => {
    // TODO: 컨펌 팝업
    navigate("/lobby");
  };

  const handleGoButton = async () => {
    try {
      if (!detector) {
        throw new Error("detector is not ready");
      }

      setDisableGoButton(true);
      initializeInterviewState();
      setIsDetectionOn(true);

      const newFace = await updateFace(detector);

      if (newFace) {
        setIsDetectionOn(false);
        toast.clearWaitingQueue();
        setMotionSnapshot(newFace);
        navigate("/interview/ai");
      }
      else {
        toast("화면에서 얼굴이 인식되지 않습니다.", Styled.toastOptions);
        setDisableGoButton(false);
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.ReadyContainer>
        <Styled.Profile>
          <Styled.VideoWrap>
            {!isWebcamReady && (
              <Skeleton variant="rectangular" width={272} height={204} />
            )}
            <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
            <Styled.Canvas ref={canvasRef} />
          </Styled.VideoWrap>
          <NameTag role="interviewee" profileName="김기태님" />
        </Styled.Profile>

        <BsThreeDots size={60} />

        <Styled.Profile>
          <Styled.ImageWrap>
            <img src={ai} alt="AI 면접관" />
          </Styled.ImageWrap>
          <NameTag role="interviewer" profileName="AI" />
        </Styled.Profile>
      </Styled.ReadyContainer>

      <Styled.FlexContainer>
        <Styled.ButtonBox>
          <Styled.CancelButton type="button" onClick={handleCancelButton}>
            면접 취소하기
          </Styled.CancelButton>
          <Styled.GoButtonWrap>
            <Styled.GoButton type="button" onClick={handleGoButton} disabled={disableGoButton}>
              GO
            </Styled.GoButton>
            <Styled.Information>
              <AiOutlineInfoCircle size={24} />
              <small>
                참가 면접관이 모두 READY 상태여야
                <br />
                면접을 시작할 수 있습니다.
              </small>
            </Styled.Information>
          </Styled.GoButtonWrap>
        </Styled.ButtonBox>
      </Styled.FlexContainer>
    </Styled.Wrapper>
  );
};

export default InterviewReady;
