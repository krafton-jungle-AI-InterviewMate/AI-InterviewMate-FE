import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import Room from "components/lobby/Room";
import CreateRoom from "components/modal/room/CreateRoom";
import { useEffect, useState } from "react";
import { useGetInterviewRooms } from "hooks/queries/interview";
import { InterviewRooms } from "api/interview/type";
import Loading from "components/common/Loading";
import ServerError from "components/common/ServerError";
import JoinError from "components/modal/lobby/JoinError";
import RoomPasswordPopup from "components/modal/lobby/RoomPasswordPopup";

const StyledLobbyInterface = styled.div`
  min-width: 1000px;
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
  min-width: 1000px;
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => (props.isError || props.isLoading ? "center" : "space-between")};
`;

const Lobby = () => {
  const [ targetRoomIdx, setTargetRoomIdx ] = useState(0);
  const [ isPasswordPopupOpen, setIsPasswordPopupOpen ] = useState(false); // TODO: 방 입장할 때 비밀번호 체크
  const [ modalCreateRoom, setModalCreateRoom ] = useState(false);
  const [ interviewRooms, setInterviewRooms ] = useState<InterviewRooms[]>([]);
  const { data, isSuccess, isLoading, isError, refetch } = useGetInterviewRooms();

  useEffect(() => {
    if (!isLoading && data) {
      setInterviewRooms(data.data.data);
    }
  }, [ data ]);

  const onClickReload = () => {
    refetch();
  };
  const [ isJoinError, setIsJoinError ] = useState(false);
  return (
    <>
      {isPasswordPopupOpen && (
        <RoomPasswordPopup
          open={isPasswordPopupOpen}
          onClose={() => setIsPasswordPopupOpen(false)}
          roomIdx={targetRoomIdx}
        />
      )}
      {modalCreateRoom && <CreateRoom open={modalCreateRoom} onClose={() => setModalCreateRoom(false)} />}
      {isJoinError ? <JoinError setIsJoinError={setIsJoinError} /> : null}
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
              roomName={room.roomName}
              roomType={room.roomType}
              roomStatus={room.roomStatus}
              roomIsPrivate={room.roomIsPrivate}
              roomTime={room.roomTime}
              roomPeopleNow={room.roomPeopleNow}
              roomPeopleNum={room.roomPeopleNum}
              idx={room.idx}
              setIsJoinError={setIsJoinError}
              setIsPasswordPopupOpen={setIsPasswordPopupOpen}
              setTargetRoomIdx={setTargetRoomIdx}
            />
          ))
        )}
      </StyledRoomContents>
    </>
  );
};

export default Lobby;
