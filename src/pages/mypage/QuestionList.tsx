import styled from "@emotion/styled";
import Questions from "components/mypage/questions/Questions";
import { useGetQuestionBoxes } from "hooks/queries/questionBoxes";
import { useEffect } from "react";
import { useState } from "react";
import { questionBoxes } from "api/questionBoxes/type";
import Loading from "components/common/Loading";

const StyledQuestionList = styled.div`
  margin-top: 120px;
`;

const QuestionList = () => {
  const [questionBoxes, setQuestionBoxes] = useState<questionBoxes[]>([]);
  const { data, isLoading, isSuccess, isError } = useGetQuestionBoxes("4");
  useEffect(() => {
    if (!isLoading && data) {
      setQuestionBoxes(data.data.data);
    }
  }, [isLoading]);
  return (
    <StyledQuestionList>
      {isLoading ? (
        <Loading margin="120" />
      ) : (
        questionBoxes.map(data => (
          <Questions
            key={data.idx}
            boxName={data.boxName}
            idx={data.idx}
            questionNum={data.questionNum}
          />
        ))
      )}
    </StyledQuestionList>
  );
};

export default QuestionList;
