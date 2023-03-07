import { useEffect, useMemo, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  feedbackAtom,
  hostAtom,
  interviewDataAtom,
  isInterviewerAtom,
  timelineRecordAtom,
} from "store/interview/atom";

import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import InterviewQuestionTab from "./InterviewerQuestionTap";
import UserVideoComponent from "./UserVideoComponent";
import UserInterviewTimer from "./UserInterviewTimer";
import { StyledBtn } from "styles/StyledBtn";

import useFaceLandmarksDetection from "hooks/useFaceLandmarksDetection";
import useCheckIrisPosition from "hooks/useCheckIrisPosition";
import useCheckHeadMotion from "hooks/useCheckHeadMotion";
import useIrisAssessment from "hooks/useIrisAssessment";
import useMotionAssessment from "hooks/useMotionAssessment";

import styled from "@emotion/styled";

interface UserInterviewStartProps {
  session: any;
  publisher: any;
  subscribers: Array<any>;
  isOpen: boolean;
  handleClickModalClose: () => void;
  handleClickModalRoomLeave: () => void;
  handleClickInterviewOut: () => void;
  InterviewEnd: () => void;
}

const UserInterviewStart = (props: UserInterviewStartProps) => {
  const {
    session,
    publisher,
    subscribers,
    isOpen,
    handleClickModalClose,
    handleClickModalRoomLeave,
    handleClickInterviewOut,
    InterviewEnd,
  } = props;

  const userInterviewData = useRecoilValue(interviewDataAtom);
  const host = useRecoilValue(hostAtom);
  const feedbackMode = useRecoilValue(feedbackAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const setTimelineRecord = useSetRecoilState(timelineRecordAtom);

  const [ video, setVideo ] = useState<null | HTMLVideoElement>(null);

  const isRealtimeMode = useMemo(() => feedbackMode === "ON", [ feedbackMode ]);
  const { face, setIsDetectionOn } = useFaceLandmarksDetection({ video });

  const { horizontalRatio } = useCheckIrisPosition({ face });
  const { isBadMotion } = useCheckHeadMotion({ face });
  useIrisAssessment({
    isRealtimeMode,
    horizontalRatio,
  });
  useMotionAssessment({
    isRealtimeMode,
    isBadMotion,
  });

  useEffect(() => {
    if (video && !isInterviewer) {
      setTimelineRecord(curr => ({
        ...curr,
        startTime: Date.now(),
      }));
      setIsDetectionOn(true);
    }
  }, [ video ]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (!isInterviewer) {
        setIsDetectionOn(false);
      }

      InterviewEnd();
    }, userInterviewData?.roomTime * 1000 * 60);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <StyledUserInterviewStart>
      {session && (
        <>
          <div className="subscribersContents">
            <div className="subscribersVideo">
              {publisher && host !== publisher.stream.connection.connectionId && (
                <div className="publisherVideo">
                  <UserVideoComponent streamManager={publisher} setVideo={setVideo} />
                </div>
              )}
              {subscribers.map(
                (sub, i) =>
                  host !== sub.stream.connection.connectionId && (
                    <div key={i}>
                      <UserVideoComponent streamManager={sub} setVideo={setVideo} />
                    </div>
                  ),
              )}
            </div>
            <div className="interviewActions">
              <StyledBtn
                onClick={handleClickModalRoomLeave}
                width="200px"
                height="48px"
                color="red"
              >
                면접 나가기
              </StyledBtn>
              <UserInterviewTimer roomTime={userInterviewData?.roomTime} />
            </div>
          </div>
          <div className="publisherContents">
            {publisher && (
              <div className="publisherVideo">
                {subscribers.map(
                  (sub, i) =>
                    host === sub.stream.connection.connectionId && (
                      <UserVideoComponent key={i} streamManager={sub} setVideo={setVideo} />
                    ),
                )}
                {host === publisher.stream.connection.connectionId && (
                  <UserVideoComponent streamManager={publisher} setVideo={setVideo} />
                )}
                {host !== publisher.stream.connection.connectionId && <InterviewQuestionTab />}
              </div>
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
              <StyledBtn
                onClick={handleClickInterviewOut}
                width="200px"
                height="42px"
                color="orange"
              >
                네!
              </StyledBtn>
              <StyledBtn onClick={handleClickModalClose} width="200px" height="42px" color="red">
                취소
              </StyledBtn>
            </DialogActions>
          </Dialog>
        </>
      )}
    </StyledUserInterviewStart>
  );
};

const StyledUserInterviewStart = styled.div`
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  .subscribersContents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 200px;
    background-color: var(--main-gray);
    .subscribersVideo {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 750px;
    }
  }
  .publisherContents {
    .publisherVideo {
      display: flex;
      justify-content: center;
    }
  }
  .interviewActions {
    position: absolute;
    top: 30px;
    right: 150px;
  }
`;

export default UserInterviewStart;
