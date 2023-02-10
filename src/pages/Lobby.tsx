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
          roomName="모의 면접 같이 하실 분"
          aiInter={true}
          roomState="진행 중"
          lock={false}
          question={5}
          currPeople={1}
          totalPeople={1}
        />
        <Room
          roomName="비밀번호 1234 입니다"
          aiInter={false}
          roomState="대기 중"
          lock={true}
          interviewTime={15}
          currPeople={1}
          totalPeople={2}
        />
        <Room
          roomName="크래프톤 면접 준비"
          aiInter={false}
          roomState="진행 중"
          interviewTime={60}
          lock={false}
          currPeople={2}
          totalPeople={2}
        />
      </StyledRoomContents>
    </>
  );
}

export default Lobby;
