import styled from "@emotion/styled";

interface StyledResultProps {
  isAiInterview: boolean;
}

const StyledResult = styled.div<StyledResultProps>`
  margin-top: 120px;
  .interviewCard {
    width: 834px;
    height: 130px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px 15px;
    border: 1px solid var(--main-gray);
    padding: 24px 32px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
    .nameDate {
      text-align: left;
      h2 {
        font-size: 24px;
        font-weight: 500;
        color: var(--main-black);
        margin: 0 0 14px;
      }
      p {
        font-size: 14px;
        color: var(--main-black);
        margin: 0;
      }
    }
    .infoTime {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .interviewer {
        width: 100px;
        height: 24px;
        font-size: 12px;
        color: var(--main-white);
        background-color: ${props =>
          props.isAiInterview ? "var(--push-gray)" : "var(--main-black)"};
        border-radius: 5px;
      }
      span {
        font-size: 14px;
        color: var(--font-gray);
      }
    }
  }
`;

interface InterviewResultProps {
  roomName: string;
  isAiInterview: boolean;
  interviewDate: string;
  question?: number;
  interviewTime?: number;
}

function InterviewResult({
  roomName,
  isAiInterview,
  interviewDate,
  question,
  interviewTime,
}: InterviewResultProps) {
  return (
    <StyledResult isAiInterview={true}>
      <div className="interviewCard">
        <div className="nameDate">
          <h2>{roomName}</h2>
          <p>{interviewDate}</p>
        </div>
        <div className="infoTime">
          <div className="interviewer">{isAiInterview ? "AI 면접관" : "유저 면접관"}</div>
          {isAiInterview ? (
            <span className="interviewTime">질문 개수: {question}개</span>
          ) : (
            <span className="interviewTime">진행 시간: {interviewTime}분</span>
          )}
        </div>
      </div>
    </StyledResult>
  );
}

export default InterviewResult;
