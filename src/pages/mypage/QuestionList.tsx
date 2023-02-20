import styled from "@emotion/styled";
import Questions from "components/mypage/questions/Questions";
import { useGetQuestionBoxes } from "hooks/queries/questionBoxes";
import { useEffect } from "react";
import { useState } from "react";
import { questionBoxes } from "api/questionBoxes/type";
import Loading from "components/common/Loading";
import ServerError from "components/common/ServerError";

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

  // 더미 데이터
  const test = [
    {
      idx: 1,
      boxName: "테스트",
      questionNum: 3,
    },
    {
      idx: 2,
      boxName: "테스트2",
      questionNum: 10,
    },
    {
      idx: 3,
      boxName: "테스트333",
      questionNum: 5,
    },
  ];
  return (
    <StyledQuestionList>
      {isLoading ? (
        <Loading margin="120" />
      ) : !isError ? (
        <ServerError />
      ) : (
        test.map(data => (
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
