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
      {modalCreateRoom ? <CreateRoom setModalCreateRoom={setModalCreateRoom} /> : null}
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
            />
          ))
        )}
      </StyledRoomContents>
    </>
  );
};

export default Lobby;
