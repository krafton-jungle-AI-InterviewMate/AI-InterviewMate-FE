import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import Room from "components/lobby/Room";
import CreateRoom from "components/modal/room/CreateRoom";
import { useEffect, useState } from "react";
import { useGetInterviewRooms } from "hooks/queries/interview";
import { InterviewRooms } from "api/interview/type";
import Loading from "components/common/Loading";
import ServerError from "components/common/ServerError";
import RoomPasswordPopup from "components/modal/lobby/RoomPasswordPopup";
import { Dialog, DialogTitle } from "@mui/material";

const StyledLobbyInterface = styled.div`
  min-width: 1200px;
  display: flex;
  margin: 75px 0 50px;
  button {
    margin-right: 30px;
  }
`;

interface StyledRoomContentsProps {
  isLoading: boolean;
  isError: boolean;
}

const StyledRoomContents = styled.div<StyledRoomContentsProps>`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => (props.isError || props.isLoading ? "center" : "space-between")};
`;

const Lobby = () => {
  const [targetRoomIdx, setTargetRoomIdx] = useState(0);
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false); // TODO: 방 입장할 때 비밀번호 체크
  const [modalCreateRoom, setModalCreateRoom] = useState(false);
  const [interviewRooms, setInterviewRooms] = useState<InterviewRooms[]>([]);
  const { data, isSuccess, isLoading, isError, refetch } = useGetInterviewRooms();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isLoading && data) {
      setInterviewRooms(data.data.data);
    }
  }, [data]);

  const onClickReload = () => {
    refetch();
  };
  const onClickCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isPasswordPopupOpen && (
        <RoomPasswordPopup
          open={isPasswordPopupOpen}
          onClose={() => setIsPasswordPopupOpen(false)}
          roomIdx={targetRoomIdx}
        />
      )}
      {modalCreateRoom && (
        <CreateRoom open={modalCreateRoom} onClose={() => setModalCreateRoom(false)} />
      )}
      <Dialog
        open={isOpen}
        onClose={onClickCancel}
        PaperProps={{
          style: {
            padding: "50px 35px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          fontSize={24}
          fontWeight={400}
          color={"var(--main-black)"}
          marginBottom={3}
          padding={0}
          textAlign={"center"}
        >
          이 방에는 입장하실 수 없습니다.
        </DialogTitle>
        <StyledDialogActions>
          <StyledBtn onClick={onClickCancel} width="200px" height="42px" color="orange">
            네!
          </StyledBtn>
        </StyledDialogActions>
      </Dialog>
      <StyledLobbyInterface>
        <StyledBtn
          width="200px"
          height="48px"
          color="orange"
          onClick={() => {
            setModalCreateRoom(true);
          }}
        >
          방 만들기
        </StyledBtn>
        <StyledBtn onClick={onClickReload} width="200px" height="48px" color="blue">
          목록 새로고침
        </StyledBtn>
      </StyledLobbyInterface>
      <StyledRoomContents isLoading={isLoading} isError={isError}>
        {isLoading ? (
          <Loading margin="120px 0 0" />
        ) : isError ? (
          <ServerError />
        ) : (
          interviewRooms.map(room => (
            <Room
              key={room.idx}
              idx={room.idx}
              roomName={room.roomName}
              roomPeopleNum={room.roomPeopleNum}
              roomTime={room.roomTime}
              roomIsPrivate={room.roomIsPrivate}
              roomType={room.roomType}
              roomStatus={room.roomStatus}
              interviewerIdxes={room.interviewerIdxes}
              setIsJoinError={setIsOpen}
              setIsPasswordPopupOpen={setIsPasswordPopupOpen}
              setTargetRoomIdx={setTargetRoomIdx}
            />
          ))
        )}
      </StyledRoomContents>
    </>
  );
};

const StyledDialogActions = styled.div`
  display: flex;
  justify-content: center;
`;

export default Lobby;
