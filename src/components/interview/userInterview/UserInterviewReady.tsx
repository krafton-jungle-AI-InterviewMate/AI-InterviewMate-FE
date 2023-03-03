import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import UserVideoComponent from "./UserVideoComponent";
import Loading from "components/common/Loading";
import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import { hostAtom, isInterviewerAtom, isInterviewStartAtom } from "store/interview/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const host = useRecoilValue(hostAtom);
  const setIsInterviewStart = useSetRecoilState(isInterviewStartAtom);

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (publisher) {
      setIsHost(host === publisher.stream.connection.connectionId);
    }
  }, [host]);

  useEffect(() => {
    let isInHost = false;
    subscribers.map(sub => {
      if (host === sub.stream.connection.connectionId) {
        isInHost = true;
      }
    });
    if (publisher && host !== publisher.stream.connection.connectionId && !isInHost) {
      setIsInterviewStart(false);
      navigate("/lobby");
    }
  }, [subscribers]);
  return (
    <StyledUserInterview isHost={isHost}>
      <div className="interviewActionsContents">
        <div className="interviewActions">
          <StyledBtn onClick={handleClickModalRoomLeave} width="200px" height="48px" color="red">
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
      </div>
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
          </div>
          <div className="subscribersContents">
            {publisher && host !== publisher.stream.connection.connectionId && (
              <div className="subscribers">
                <UserVideoComponent streamManager={publisher} />
              </div>
            )}
            {subscribers.map(
              (sub, i) =>
                host !== sub.stream.connection.connectionId && (
                  <div key={i} className="subscribers">
                    <UserVideoComponent streamManager={sub} />
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
    z-index: 10;
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
    }
  }
  .publisherContents {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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
