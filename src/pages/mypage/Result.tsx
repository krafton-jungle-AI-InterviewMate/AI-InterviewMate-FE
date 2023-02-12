import InterviewResult from "components/interview/InterviewResult";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledResult = styled.div`
  margin-top: 120px;
`;

function Result() {
  return (
    <StyledResult>
      <Link to="/mypage/result/details">
        <InterviewResult
          roomName="JS 면접 준비"
          isAiInterview={true}
          interviewDate="2월 11일 토요일 08:30 면접"
          question={3}
        />
      </Link>
      <Link to="/mypage/result/details">
        <InterviewResult
          roomName="좋은 면접 좋은 자리"
          isAiInterview={true}
          interviewDate="2월 11일 토요일 08:43 면접"
          question={5}
        />
      </Link>
    </StyledResult>
  );
}

export default Result;
