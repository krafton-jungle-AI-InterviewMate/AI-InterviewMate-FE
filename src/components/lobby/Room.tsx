import styled from "@emotion/styled";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdPublic } from "react-icons/md";

interface IRoom {
  aiInter: boolean;
}

const StyledRoom = styled.div<IRoom>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 388px;
  height: 105px;
  border-radius: 5px;
  border: 1px solid var(--main-gray);
  background-color: var(--main-white);
  padding: 28px 42px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 24px rgba(0, 0, 0, 0.03));
  .roomHeader {
    display: flex;
    justify-content: space-between;
    .roomName {
      color: var(--main-black);
      text-align: left;
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }
      span {
        font-size: 12px;
      }
    }
    .interviewer {
      width: 100px;
      height: 24px;
      background-color: ${props => props.aiInter};
      font-size: 12px;
      background-color: ${props => (props.aiInter ? "var(--push-gray)" : "var(--main-black)")};
      border-radius: 5px;
      color: var(--main-white);
    }
  }
  .roomState {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--font-gray);
    p {
      margin: 0;
    }
    .warningComent {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      line-height: 15px;
      p {
        margin-left: 6px;
      }
    }
    .roomInfo {
      display: flex;
      align-items: flex-end;
      span {
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
`;

interface RoomProps {
  roomName: string; // 방 제목
  isAiInterview: boolean; // AI 면접, 유저 면접
  isLock: boolean; // 잠금 여부
  roomState: string; // 방 상태
  question?: number; // 질문 개수
  interviewTime?: number; // 인터뷰 시간
  currPeople: number; // 현재 인원 수
  totalPeople: number; // 총 인원 수
}

function Room({
  roomName,
  isAiInterview,
  isLock,
  roomState,
  question,
  interviewTime,
  currPeople,
  totalPeople,
}: RoomProps) {
  return (
    <StyledRoom aiInter={isAiInterview}>
      <div className="roomHeader">
        <div className="roomName">
          <p>{roomName}</p>
          {isAiInterview ? (
            <span>질문 개수: {question}개</span>
          ) : (
            <span>진행 시간: {interviewTime}분</span>
          )}
        </div>
        <div className="interviewer">{isAiInterview ? "AI 면접관" : "유저 면접관"}</div>
      </div>

      <div className="roomState">
        <p>{roomState}</p>
        {isAiInterview ? (
          <div className="warningComent">
            <AiOutlineInfoCircle size={"25px"} color={"var(--push-gray)"} />
            <p>
              AI 면접관 방에는 입장하실 수 없습니다.
              <br />방 만들기 기능을 이용해주세요.
            </p>
          </div>
        ) : isLock ? (
          <div className="roomInfo">
            <span>
              {currPeople} / {totalPeople}
            </span>
            <RiGitRepositoryPrivateFill size={"32px"} color={"var(--push-gray)"} />
          </div>
        ) : (
          <div className="roomInfo">
            <span>
              {currPeople} / {totalPeople}
            </span>
            <MdPublic size={"32px"} color={"var(--push-gray)"} />
          </div>
        )}
      </div>
    </StyledRoom>
  );
}

export default Room;