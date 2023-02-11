import InterviewResult from "components/layout/Result/InterviewResult";

function Result() {
  return (
    <InterviewResult
      roomName="JS 면접 준비"
      isAiInterview={true}
      interviewDate="2월 11일 토요일 08:30 면접"
      question={3}
    />
  );
}

export default Result;
