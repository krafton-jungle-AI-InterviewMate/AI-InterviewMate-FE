import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import UserVideoComponent from "./UserVideoComponent";
import Loading from "components/common/Loading";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import { isInterviewerAtom } from "store/interview/atom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";

interface UserInterviewReadyProps {
  session: any;
  publisher: any;
  subscribers: Array<any>;
  ready: boolean;
  isOpen: boolean;
  leaveSession: () => void;
  handleClickLeave: () => void;
  handleClickStart: () => void;
  handleClickClose: () => void;
}

const UserInterviewReady = (props: UserInterviewReadyProps) => {
  const {
    session,
    publisher,
    subscribers,
    ready,
    isOpen,
    leaveSession,
    handleClickClose,
    handleClickLeave,
    handleClickStart,
  } = props;
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  return (
    <StyledUserInterview>
      {session ? (
        <>
          <div className="videoContents">
            {publisher ? (
              <div>
                <UserVideoComponent streamManager={publisher} isInterviewer={false} />
              </div>
            ) : (
              <Loading margin="0 0 0 30px" />
            )}
            <div>
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <UserVideoComponent streamManager={sub} isInterviewer={true} />
                </div>
              ))}
            </div>
          </div>
          <div className="interviewActions">
            <StyledBtn onClick={handleClickLeave} width="200px" height="48px" color="red">
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
            <div className="readyText">
              <AiOutlineInfoCircle size={24} color="var(--font-gray)" />
              <span>
                참가 면접관이 한명이라도 있어야
                <br />
                면접을 시작할 수 있습니다.
              </span>
            </div>
          )}
          <Dialog
            open={isOpen}
            onClose={handleClickClose}
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
              <StyledBtn onClick={leaveSession} width="200px" height="42px" color="orange">
                네!
              </StyledBtn>
              <StyledBtn onClick={handleClickClose} width="200px" height="42px" color="red">
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
  width: 1000px;
  .readyText {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
    line-height: 15px;
    text-align: left;
    color: var(--font-gray);
    svg {
      margin-right: 5px;
    }
  }
  .videoContents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 654px;
  }
  .interviewActions {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 28px;
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
