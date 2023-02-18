import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import Room from "components/lobby/Room";
import CreateRoom from "components/modal/room/CreateRoom";
import { useEffect, useState } from "react";
import { useGetInterviewRooms } from "./../hooks/queries/lobby/lobby";
import { InterviewRooms } from "api/lobby/type";
import Loading from "components/common/Loading";
import ServerError from "./ServerError";

const StyledLobbyInterface = styled.div`
  min-width: 1000px;
  display: flex;
  margin: 75px 0 50px;
  button {
    margin-right: 30px;
  }
`;

const StyledRoomContents = styled.div`
  min-width: 1000px;
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Lobby() {
  const [modalCreateRoom, setModalCreateRoom] = useState(true);
  const [interviewRooms, setInterviewRooms] = useState<InterviewRooms[]>([]);
  const { data, isSuccess, isLoading, isError } = useGetInterviewRooms();
  useEffect(() => {
    if (!isLoading && data) {
      setInterviewRooms(data.data.data);
    }
  }, [isLoading]);
  const onClickReload = () => {
    window.location.reload();
  };
  return (
    <>
      {modalCreateRoom ? <CreateRoom setModalCreateRoom={setModalCreateRoom} /> : null}
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
      <StyledRoomContents>
        {isLoading ? (
          <Loading margin="120px 0 0" />
        ) : isError ? (
          <ServerError />
        ) : (
          interviewRooms.map(room => (
            <Room
              key={room.createdAt}
              roomName={room.roomName}
              roomType={room.roomType}
              roomStatus={room.roomStatus}
              roomIsPrivate={room.roomIsPrivate}
              question={5}
              roomPeopleNow={room.roomPeopleNow}
              roomPeopleNum={room.roomPeopleNum}
            />
          ))
        )}
      </StyledRoomContents>
    </>
  );
}

export default Lobby;
