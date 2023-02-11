import InterviewResult from "components/layout/Result/InterviewResult";
import styled from "@emotion/styled";

const StyledResult = styled.div`
  margin-top: 120px;
`;

function Result() {
  return (
    <StyledResult>
      <InterviewResult
        roomName="JS 면접 준비"
        isAiInterview={true}
        interviewDate="2월 11일 토요일 08:30 면접"
        question={3}
      />
      <InterviewResult
        roomName="좋은 면접 좋은 자리"
        isAiInterview={true}
        interviewDate="2월 11일 토요일 08:43 면접"
        question={5}
      />
    </StyledResult>
  );
}

export default Result;
