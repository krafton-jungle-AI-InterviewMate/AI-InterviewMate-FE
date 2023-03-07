import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hostAtom, isInterviewerAtom, motionSnapshotAtom } from "store/interview/atom";

import useInitializeInterviewState from "hooks/useInitializeInterviewState";
import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";

import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import UserVideoComponent from "./UserVideoComponent";
import Loading from "components/common/Loading";
import { StyledBtn } from "styles/StyledBtn";
import { toast } from "react-toastify";
import * as Styled from "pages/interview/InterviewReady/style";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface UserInterviewReadyProps {
  session: any;
  publisher: any;
  subscribers: Array<any>;
  ready: boolean;
  isOpen: boolean;
  handleClickReadyOut: () => void;
  handleClickModalRoomLeave: () => void;
  handleClickStart: () => Promise<void>;
  handleClickModalClose: () => void;
}

const UserInterviewReady = (props: UserInterviewReadyProps) => {
  const {
    session,
    publisher,
    subscribers,
    ready,
    isOpen,
    handleClickReadyOut,
    handleClickModalClose,
    handleClickModalRoomLeave,
    handleClickStart,
  } = props;
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const host = useRecoilValue(hostAtom);
  const setMotionSnapshot = useSetRecoilState(motionSnapshotAtom);

  const [ isHost, setIsHost ] = useState(false);
  const [ video, setVideo ] = useState<null | HTMLVideoElement>(null);

  const { initializeInterviewState } = useInitializeInterviewState();
  const { isVideoReady, setNewDetector, setIsDetectionOn, updateFace, detector } =
    useFaceLandmarksDetection({
      video,
      isOneOff: true,
    });

  useEffect(() => {
    if (publisher) {
      setIsHost(host === publisher.stream.connection.connectionId);
    }
  }, [ host ]);

  useEffect(() => {
    if (isVideoReady && !isInterviewer) {
      (async () => {
        await setNewDetector();
      })();
    }
  }, [ isVideoReady, isInterviewer ]);

  const handleStart = async () => {
    if (!detector) {
      throw new Error("detector is not ready");
    }

    initializeInterviewState();

    if (!isInterviewer) {
      setIsDetectionOn(true);

      const newFace = await updateFace(detector);

      if (newFace) {
        setIsDetectionOn(false);
        toast.clearWaitingQueue();
        setMotionSnapshot(newFace);
      }
      else {
        toast("화면에서 얼굴이 인식되지 않습니다", Styled.toastOptions);
      }
    }

    await handleClickStart();
  };

  return (
    <StyledUserInterview isHost={isHost}>
      <div className="interviewActionsContents">
        {publisher && (
          <div className="interviewActions">
            <StyledBtn onClick={handleClickModalRoomLeave} width="200px" height="48px" color="red">
              나가기
            </StyledBtn>
            {!isInterviewer && (
              <NewStyledBtn
                onClick={handleStart}
                width="200px"
                height="48px"
                color="orange"
                ready={ready}
              >
                GO
              </NewStyledBtn>
            )}
          </div>
        )}
      </div>
      {session ? (
        <>
          <div className="publisherContents">
            {publisher && host === publisher.stream.connection.connectionId ? (
              <UserVideoComponent streamManager={publisher} setVideo={setVideo} />
            ) : (
              <>
                {subscribers.map(
                  (sub, i) =>
                    host === sub.stream.connection.connectionId && (
                      <UserVideoComponent key={i} streamManager={sub} setVideo={setVideo} />
                    ),
                )}
              </>
            )}
          </div>
          <div className="subscribersContents">
            {publisher && host !== publisher.stream.connection.connectionId && (
              <div className="subscribers">
                <UserVideoComponent streamManager={publisher} setVideo={setVideo} />
              </div>
            )}
            {subscribers.map(
              (sub, i) =>
                host !== sub.stream.connection.connectionId && (
                  <div key={i} className="subscribers">
                    <UserVideoComponent streamManager={sub} setVideo={setVideo} />
                  </div>
                ),
            )}
          </div>

          <Dialog
            open={isOpen}
            onClose={handleClickModalClose}
            PaperProps={{
              style: {
                padding: "50px 35px",
                borderRadius: "10px",
              },
            }}
          >
            <DialogTitle
              fontSize={16}
              fontWeight={400}
              color={"var(--main-black)"}
              marginBottom={3}
              padding={0}
              textAlign={"center"}
            >
              현재 면접 방을 나가고
              <br />
              로비로 이동하시겠습니까?
            </DialogTitle>
            <DialogActions>
              <StyledBtn onClick={handleClickReadyOut} width="200px" height="42px" color="orange">
                네!
              </StyledBtn>
              <StyledBtn onClick={handleClickModalClose} width="200px" height="42px" color="red">
                취소
              </StyledBtn>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Loading margin="250px" />
      )}
    </StyledUserInterview>
  );
};

interface StyledUserInterviewProps {
  isHost: boolean;
}

const StyledUserInterview = styled.div<StyledUserInterviewProps>`
  position: relative;
  width: 75vw;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  .interviewActionsContents {
    position: absolute;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 75vw;
    height: 750px;
    .interviewActions {
      display: flex;
      justify-content: space-between;
      width: ${props => props.isHost && "450px"};
      margin-bottom: 50px;
    }
  }
  .subscribersContents {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .subscribers {
      width: 333px;
      height: 250px;
      background-color: var(--main-black);
    }
  }
  .publisherContents {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 1000px;
    height: 750px;
    background-color: var(--main-black);
  }
`;

interface NewStyledBtnProps {
  ready: Boolean;
}

const NewStyledBtn = styled(StyledBtn)<NewStyledBtnProps>`
  ${({ ready }) =>
    !ready &&
    css`
      background-color: var(--push-gray);
      &:hover {
        background-color: var(--push-gray);
      }
    `}
`;

export default UserInterviewReady;
