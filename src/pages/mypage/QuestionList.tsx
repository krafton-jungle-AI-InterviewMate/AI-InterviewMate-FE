import styled from "@emotion/styled";
import Questions from "components/mypage/questions/Questions";
import { useGetQuestionBoxes } from "hooks/queries/questionBoxes";
import { useEffect } from "react";
import { useState } from "react";
import { QuestionBoxes } from "api/questionBoxes/type";
import Loading from "components/common/Loading";
import ServerError from "components/common/ServerError";

const StyledQuestionList = styled.div`
  margin-top: 120px;
`;

const QuestionList = () => {
  const [questionBoxes, setQuestionBoxes] = useState<QuestionBoxes[]>([]);
  const { data, isLoading, isError } = useGetQuestionBoxes();
  useEffect(() => {
    if (!isLoading && data) {
      setQuestionBoxes(data.data.data);
    }
  }, [isLoading]);
  return (
    <StyledQuestionList>
      {isLoading ? (
        <Loading margin="120" />
      ) : isError ? (
        <ServerError />
      ) : (
        questionBoxes.map(data => (
          <Questions
            key={data.questionBoxIdx}
            boxName={data.questionBoxName}
            idx={data.questionBoxIdx}
            questionNum={data.questionNum}
          />
        ))
      )}
    </StyledQuestionList>
  );
};

export default QuestionList;
