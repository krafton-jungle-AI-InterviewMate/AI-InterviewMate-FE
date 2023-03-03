import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";
import SubmitProcessingPopup from "components/interview/SubmitProcessingPopup";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerScriptAtom,
  aiInterviewNextProcessAtom,
  aiRoomResponseAtom,
  timelineRecordAtom,
  videoUrlAtom,
  recordModeAtom,
} from "store/interview/atom";
import { usePutInterviewRooms } from "hooks/queries/interview";
import { usePostRatingViewee } from "hooks/queries/mypage";
import { usePostAbortVideoUpload } from "hooks/queries/video";
import { PostRatingVieweePayloadData } from "api/mypage/types";
import { deduplicate } from "lib/interview";

import styled from "@emotion/styled";

const FinishedModeController = () => {
  const navigate = useNavigate();

  const {
    timeline: {
      eyes,
      attitude,
      questionModeStart,
    },
  } = useRecoilValue(timelineRecordAtom);
  const isRecordMode = useRecoilValue(recordModeAtom);
  const aiRoomResponse = useRecoilValue(aiRoomResponseAtom);
  const answerScript = useRecoilValue(answerScriptAtom);
  const videoUrl = useRecoilValue(videoUrlAtom);
  const setAiInterviewNextProcess = useSetRecoilState(aiInterviewNextProcessAtom);

  const [ isProcessing, setIsProcessing ] = useState(false);

  const {
    mutate,
    isLoading,
  } = usePostRatingViewee();
  const {
    mutate: abortVideoUpload,
  } = usePostAbortVideoUpload();
  const { mutate: changeRoomState } = usePutInterviewRooms();

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }

    if (!aiRoomResponse) {
      return;
    }

    const {
      data: {
        roomIdx,
      },
    } = aiRoomResponse;

    const data: PostRatingVieweePayloadData = {
      eyeTimelines: deduplicate(eyes),
      attitudeTimelines: deduplicate(attitude),
      questionTimelines: questionModeStart,
      comments: [],
      scripts: answerScript,
    };

    mutate({
      roomIdx,
      data,
    }, {
      onSuccess: () => {
        setAiInterviewNextProcess("end");
        changeRoomState(roomIdx);

        if (!isRecordMode) {
          navigate("/interview/end", { replace: true });
        }
      },
      onError ( error ) {
        alert(error);
      },
    });
  };

  useEffect(() => {
    if (videoUrl) {
      setIsProcessing(false);
      handleSubmit();
    }
  }, [ videoUrl ]);

  const handleSubmitButtonClick = () => {
    handleSubmit();

    if (isRecordMode) {
      setIsProcessing(true);
    }
  };

  const handleProcessingPopupClose = () => {
    setIsProcessing(false);
    changeRoomState(aiRoomResponse!.data.roomIdx);
    navigate("/interview/end", { replace: true });
  };

  const handleCancelProcessing = (fileName: string, uploadId: string) => {
    abortVideoUpload({
      fileName,
      uploadId,
    },
    {
      onSettled: handleProcessingPopupClose,
    },
    );
  };

  return (
    <StyledWrap>
      {isProcessing &&
        <SubmitProcessingPopup
          isOpen={isProcessing}
          handleClose={handleProcessingPopupClose}
          handleCancel={handleCancelProcessing}
        />
      }
      <InterviewComment>
        <StyledComment>
          {InterviewModeComment.finished}
          <StyledSubmitButton type="button" onClick={handleSubmitButtonClick}>
            📝 면접 결과 제출하고 나가기
          </StyledSubmitButton>
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default FinishedModeController;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledComment = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
`;

const StyledSubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: var(--main-white);
  margin-left: 50px;
  transition: all 200ms;
  background-color: var(--main-orange);

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
