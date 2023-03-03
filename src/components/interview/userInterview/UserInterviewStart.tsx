import styled from "@emotion/styled";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRecoilValue } from "recoil";
import { hostAtom, interviewDataAtom } from "store/interview/atom";
import { StyledBtn } from "styles/StyledBtn";
import InterviewQuestionTab from "./InterviewerQuestionTap";
import UserVideoComponent from "./UserVideoComponent";
import { useEffect } from "react";
import UserInterviewTimer from "./UserInterviewTimer";

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

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      InterviewEnd();
    }, userInterviewData?.roomTime * 1000); // ! TODO 수정 *60

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
                  <UserVideoComponent streamManager={publisher} />
                </div>
              )}
              {subscribers.map(
                (sub, i) =>
                  host !== sub.stream.connection.connectionId && (
                    <div key={i}>
                      <UserVideoComponent streamManager={sub} />
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
            </div>
          </div>
          <UserInterviewTimer roomTime={userInterviewData?.roomTime} />
          <div className="publisherContents">
            {publisher && (
              <div className="publisherVideo">
                {subscribers.map(
                  (sub, i) =>
                    host === sub.stream.connection.connectionId && (
                      <UserVideoComponent key={i} streamManager={sub} />
                    ),
                )}
                {host === publisher.stream.connection.connectionId && (
                  <UserVideoComponent streamManager={publisher} />
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
  width: 99vw;
  overflow-x: hidden;
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
