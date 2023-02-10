import styled from "@emotion/styled";
import { StyledOrangeBtn } from "styles/OrangeBtn";
import { Link } from "react-router-dom";
import { StyledBlueBtn } from "styles/BlueBtn";
import Room from "components/layout/lobby/Room";

const StyledLobbyInterface = styled.div`
  min-width: 1000px;
  display: flex;
  margin: 75px 0 50px;
  a {
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
  return (
    <>
      <StyledLobbyInterface>
        <Link to="/interview/ready">
          <StyledOrangeBtn width="200px" height="48px">
            시작하기
          </StyledOrangeBtn>
        </Link>
        <StyledBlueBtn width="200px" height="48px">
          목록 새로고침
        </StyledBlueBtn>
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
