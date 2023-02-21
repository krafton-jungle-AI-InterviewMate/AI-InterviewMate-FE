import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuestionDetails } from "hooks/queries/questionBoxes";

import Loading from "components/common/Loading";
import { StyledBtn } from "styles/StyledBtn";

import styled from "@emotion/styled";
import { a11yHidden } from "styles/common";

import questionDetailList from "components/mypage/_mock/questionDetails";

const QuestionDetails = () => {
  const [ searchParams ] = useSearchParams();
  const [ title, setTitle ] = useState(questionDetailList[0].questionBox.boxName);

  const {
    data,
    refetch, // TODO: 타이틀 수정 기능
    isSuccess,
    isFetching,
  } = useQuestionDetails(
    Number(searchParams.get("box")),
  );

  // useEffect(() => {
  //   if (data) {
  //     setTitle(data.data.data[0].questionTitle);
  //   }
  // }, [ data ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (isFetching) {
    return (
      <StyledWrapper>
        <Loading margin="0" />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      {isSuccess && data ? (
        <>
          <StyledTitleWrap>
            <StyledHiddenLabel htmlFor="question-title">
              질문 꾸러미 이름
            </StyledHiddenLabel>
            <StyledInput id="question-title" value={title} onChange={handleChange} />
            <StyledEditButton type="button" onClick={() => {}}>수정</StyledEditButton>
          </StyledTitleWrap>
          <StyledList>
            {questionDetailList.map((question) =>
              <StyledQuestion key={question.idx}>
                <StyledLeftSecion>
                  <StyledIcon>Q.</StyledIcon>
                  <StyledQuestionButton>
                    {question.questionTitle}
                  </StyledQuestionButton>
                </StyledLeftSecion>
                <StyledBtn
                  type="button"
                  onClick={() => {}}
                  width="100px"
                  height="32px"
                  color="red"
                >
                  삭제
                </StyledBtn>
              </StyledQuestion>,
            )}
          </StyledList>
        </>
      ) : (
        <div>
          <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
        </div>
      )}
    </StyledWrapper>
  );
};

export default QuestionDetails;

const StyledWrapper = styled.section`
  width: 900px;
  margin-top: 70px;
`;

const StyledTitleWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 442px;
  margin-bottom: 44px;
`;

const StyledHiddenLabel = styled.label`
  ${a11yHidden}
`;

const StyledInput = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--push-gray);
  font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  font-size: 24px;
  color: var(--main-black);
  padding: 6px;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  background-color: transparent;
  font-size: 16px;
  color: var(--font-gray);
`;

const StyledList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledQuestion = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: var(--button-border-radius);
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  margin-bottom: 32px;
  padding: 7px 10px 7px 32px;
  box-sizing: border-box;
  transition: border-color 200ms;

  &:hover {
    border-color: var(--main-orange);
  }
`;

const StyledLeftSecion = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 120px);
`;

const StyledIcon = styled.i`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: var(--main-white);
  background-color: var(--main-black);
  margin-right: 12px;
`;

const StyledQuestionButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: 500;
  color: var(--main-black);
  padding-left: 0;
  width: 100%;
  text-align: left;
`;
