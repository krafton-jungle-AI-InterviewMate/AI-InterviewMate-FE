import styled from "@emotion/styled";
import Questions from "components/mypage/questions/Questions";

const StyledQuestionList = styled.div`
  margin-top: 120px;
`;

const QuestionList = () => {
  return (
    <StyledQuestionList>
      <Questions />
    </StyledQuestionList>
  );
};

export default QuestionList;
