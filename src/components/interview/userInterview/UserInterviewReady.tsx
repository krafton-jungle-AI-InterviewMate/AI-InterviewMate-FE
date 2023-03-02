import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import UserVideoComponent from "./UserVideoComponent";
import Loading from "components/common/Loading";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import { hostAtom, isInterviewerAtom } from "store/interview/atom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";

interface UserInterviewReadyProps {
  session: any;
  publisher: any;
  subscribers: Array<any>;
  ready: boolean;
  isOpen: boolean;
  handleClickReadyOut: () => void;
  handleClickModalRoomLeave: () => void;
  handleClickStart: () => void;
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
  return (
    <StyledUserInterview>
      {session ? (
        <>
          <div className="publisherContents">
            {publisher && host === publisher.stream.connection.connectionId ? (
              <UserVideoComponent streamManager={publisher} />
            ) : (
              <>
                {subscribers.map(
                  (sub, i) =>
                    host === sub.stream.connection.connectionId && (
                      <UserVideoComponent key={i} streamManager={sub} />
                    ),
                )}
              </>
            )}
            <div className="interviewActionsContents">
              <div className="interviewActions">
                <StyledBtn
                  onClick={handleClickModalRoomLeave}
                  width="200px"
                  height="48px"
                  color="red"
                >
                  나가기
                </StyledBtn>
                {!isInterviewer && (
                  <NewStyledBtn
                    onClick={handleClickStart}
                    width="200px"
                    height="48px"
                    color="orange"
                    ready={ready}
                  >
                    GO
                  </NewStyledBtn>
                )}
              </div>
              {!ready && (
                <div className="readyError">
                  <div className="readyText">
                    <AiOutlineInfoCircle size={24} color="var(--font-gray)" />
                    <span>
                      참가 면접관이 한명이라도 있어야
                      <br />
                      면접을 시작할 수 있습니다.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="subscribersContents">
            <div>
              {publisher && host !== publisher.stream.connection.connectionId && (
                <div>
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

const StyledUserInterview = styled.div`
  width: 80vw;
  overflow-x: hidden;

  .subscribersContents {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .publisherContents {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .interviewActionsContents {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      width: 1000px;
      height: 757px;
      .interviewActions {
        display: flex;
        justify-content: space-between;
        width: 450px;
      }
      .readyError {
        display: flex;
        justify-content: flex-end;
        width: 450px;
      }
      .readyText {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        background-color: var(--main-white);
        margin: 15px 0 10px;
        font-size: 12px;
        line-height: 15px;
        text-align: left;
        color: var(--font-gray);
        svg {
          margin-right: 5px;
        }
      }
    }
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
