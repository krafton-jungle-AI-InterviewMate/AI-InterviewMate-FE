import { formatDate } from "lib/format";
import { RoomTypes } from "api/mypage/types";
import styled from "@emotion/styled";

interface StyledResultProps {
  roomType: RoomTypes;
}

const StyledResult = styled.div<StyledResultProps>`
  width: 1000px;
  height: 230px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px 15px;
  border: 2px solid var(--main-black);
  padding: 24px 32px;
  margin-bottom: 50px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  .nameDate {
    text-align: left;
    h2 {
      font-size: 2rem;
      font-weight: 500;
      color: var(--main-black);
      margin: 0 0 14px;
    }
    p {
      font-size: 1.6rem;
      color: var(--font-gray);
      margin: 0;
    }
  }
  .infoTime {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .interviewer {
      width: 200px;
      height: 60px;
      line-height: 60px;
      font-size: 1.6rem;
      color: var(--main-white);
      background-color: ${props =>
    props.roomType === "AI" ? "var(--main-blue)" : "var(--main-black)"};
      border-radius: 10px;
    }
    span {
      font-size: 1.6rem;
      color: var(--font-gray);
    }
  }
`;

interface InterviewResultProps {
  roomName: string;
  roomType: RoomTypes;
  createdAt: string;
  roomTime: number;
  roomQuestionNum: number;
}

function InterviewResult({
  roomName,
  createdAt,
  roomType,
  roomTime,
  roomQuestionNum,
}: InterviewResultProps) {
  return (
    <StyledResult roomType={roomType}>
      <div className="nameDate">
        <h2>{roomName}</h2>
        <p>
          {formatDate(createdAt)} 면접
        </p>
      </div>
      <div className="infoTime">
        <div className="interviewer">{roomType === "AI" ? "AI 면접관" : "유저 면접관"}</div>
        {roomType === "AI" ? (
          <span className="interviewTime">질문 개수: {roomQuestionNum}개</span>
        ) : (
          <span className="interviewTime">진행 시간: {roomTime}분</span>
        )}
      </div>
    </StyledResult>
  );
}

export default InterviewResult;
