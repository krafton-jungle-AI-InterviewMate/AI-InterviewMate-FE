import styled from "@emotion/styled";
import { StyledBtn } from "styles/StyledBtn";
import { useNavigate } from "react-router-dom";
import Room from "components/lobby/Room";

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
  const navigate = useNavigate();

  return (
    <>
      <StyledLobbyInterface>
        <StyledBtn
          width="200px"
          height="48px"
          color="orange"
          onClick={() => {
            navigate("/interview/ready");
          }}
        >
          방 만들기
        </StyledBtn>
        <StyledBtn width="200px" height="48px" color="blue">
          목록 새로고침
        </StyledBtn>
      </StyledLobbyInterface>
      <StyledRoomContents>
        <Room
          roomName="무신사 짱짱"
          isAiInterview={true}
          roomState="진행 중"
          isLock={false}
          question={5}
          currPeople={1}
          totalPeople={1}
        />
        <Room
          roomName="당근 마켓 가즈아"
          isAiInterview={true}
          roomState="대기 중"
          isLock={false}
          question={6}
          currPeople={1}
          totalPeople={1}
        />
        <Room
          roomName="크래프톤 면접 준비"
          isAiInterview={true}
          roomState="진행 중"
          question={3}
          isLock={false}
          currPeople={1}
          totalPeople={1}
        />
      </StyledRoomContents>
    </>
  );
}

export default Lobby;
