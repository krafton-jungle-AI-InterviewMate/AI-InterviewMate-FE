import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motionSnapshotAtom, aiInterviewerAtom } from "store/interview/atom";
import { memberAtom } from "store/auth/atom";

import useInitializeInterviewState from "hooks/useInitializeInterviewState";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";
import useSetAzureToken from "hooks/useSetAzureToken";

import InterviewerSelectModal from "./InterviewerSelectModal";
import Webcam from "react-webcam";
import NameTag from "components/interview/InterviewNameTag";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { getAiInterviewerProfile, getAiInterviewerThumbnail } from "lib/interview";
import Popup from "components/common/Popup";

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
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isConfirmPopupOpen, setIsConfirmPopupOpen ] = useState(false);

  const setMotionSnapshot = useSetRecoilState(motionSnapshotAtom);
  const aiInterviewer = useRecoilValue(aiInterviewerAtom);
  const { nickname } = useRecoilValue(memberAtom);

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

  const {
    isAzureTokenFetching,
    isAzureTokenSuccess,
    isAzureTokenError,
  } = useSetAzureToken();

  useEffect(() => {
    if (isWebcamReady && isVideoReady && isAzureTokenSuccess) {
      setDisableGoButton(false);
    }
    else if (isAzureTokenError) {
      window.alert("죄송합니다. 음성 파일을 가져오지 못했습니다. 관리자에게 문의해 주세요.");
    }
  }, [ isWebcamReady, isVideoReady, isAzureTokenFetching ]);

  useEffect(() => {
    if (isVideoReady) {
      (async() => {
        await setNewDetector();
      })();
    }
  }, [ isVideoReady ]);

  const handleLeave = () => {
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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInterviewerSelect = () => {
    setIsModalOpen(true);
  };

  return (
    <Styled.Wrapper>
      {isConfirmPopupOpen && (
        <Popup
          open={isConfirmPopupOpen}
          onClose={() => setIsConfirmPopupOpen(false)}
          confirmText="네!"
          cancelText="취소"
          onConfirm={handleLeave}
        >
          <Styled.ConfirmText>
            현재 면접 방을 나가고
            <br />
            로비로 이동하시겠습니까?
          </Styled.ConfirmText>
        </Popup>
      )}
      <InterviewerSelectModal isOpen={isModalOpen} handleClose={handleModalClose} />

      <Styled.ReadyContainer>
        <Styled.Profile>
          <Styled.VideoWrap>
            {!isWebcamReady && (
              <Skeleton variant="rectangular" width={272} height={204} />
            )}
            <Webcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
            <Styled.Canvas ref={canvasRef} />
          </Styled.VideoWrap>
          <NameTag role="interviewee" profileName={nickname + "님"} />
        </Styled.Profile>

        <BsThreeDots size={60} />

        <Styled.Profile>
          <Styled.SelectButton type="button" onClick={handleInterviewerSelect}>
            면접관 선택하기
          </Styled.SelectButton>
          <Styled.ImageWrap bgImg={getAiInterviewerThumbnail(aiInterviewer)} />
          <NameTag role="interviewer" profileName={aiInterviewer} />
          <Styled.MiniProfile>
            {getAiInterviewerProfile(aiInterviewer)}
          </Styled.MiniProfile>
        </Styled.Profile>
      </Styled.ReadyContainer>

      <Styled.FlexContainer>
        <Styled.ButtonBox>
          <Styled.CancelButton type="button" onClick={() => setIsConfirmPopupOpen(true)}>
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
