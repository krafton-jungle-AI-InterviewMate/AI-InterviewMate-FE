import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useQuestionDetails,
  useDeleteQuestion,
  usePutQuestionBoxName,
} from "hooks/queries/questionBoxes";

import Loading from "components/common/Loading";
import { StyledBtn } from "styles/StyledBtn";

import styled from "@emotion/styled";
import { a11yHidden } from "styles/common";

const QuestionDetails = () => {
  const [ searchParams ] = useSearchParams();
  const [ title, setTitle ] = useState("");
  const [ showCheckIcon, setShowCheckIcon ] = useState(false);

  const {
    data,
    refetch,
    isSuccess,
    isFetching,
  } = useQuestionDetails(
    Number(searchParams.get("box")),
  );
  const {
    mutate: deleteQuestion,
    isSuccess: isDeleteSuccess,
  } = useDeleteQuestion();
  const {
    mutate: modifyQuestionBoxName,
    isSuccess: isModifyComplete,
  } = usePutQuestionBoxName();

  useEffect(() => {
    if (data) {
      setTitle(data.data?.data?.questionBoxName ?? "");
    }
  }, [ data ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }
  }, [ isDeleteSuccess ]);

  useEffect(() => {
    if (isModifyComplete) {
      setShowCheckIcon(true);

      const timerId = window.setTimeout(() => {
        setShowCheckIcon(false);
      }, 1000 * 3);

      return (() => {
        window.clearTimeout(timerId);
      });
    }
  }, [ isModifyComplete ]);

  const questionBoxIdx = useMemo(() => {
    return Number(searchParams.get("box") ?? 999);
  }, [ searchParams ]);

  const questions = useMemo(() => {
    if (data) {
      return data?.data?.data?.questions ?? [];
    }
    else {
      return [];
    }
  }, [ data ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuestionDelete = (questionIdx) => {
    deleteQuestion(questionIdx);
  };

  const handleTitleModify = () => {
    modifyQuestionBoxName({
      questionBoxIdx,
      questionBoxName: title,
    });
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
            <StyledEditButton type="button" onClick={handleTitleModify}>
              수정
            </StyledEditButton>
            {showCheckIcon && <StyledCheckIcon>✅</StyledCheckIcon>}
          </StyledTitleWrap>
          <StyledList>
            {questions.length ? questions.map((question, idx) =>
              <StyledQuestion key={idx}>
                <StyledLeftSecion>
                  <StyledIcon>Q.</StyledIcon>
                  <StyledQuestionButton>
                    {question.questionTitle}
                  </StyledQuestionButton>
                </StyledLeftSecion>
                <StyledBtn
                  type="button"
                  onClick={() => handleQuestionDelete(idx)}
                  width="100px"
                  height="32px"
                  color="red"
                >
                  삭제
                </StyledBtn>
              </StyledQuestion>,
            ) : (
              <p className="empty">등록된 질문이 없습니다.</p>
            )}
            <StyledFixedBottom>
              <StyledAddQuestionButton type="button" onClick={() => {}}>
                + 질문 추가하기
              </StyledAddQuestionButton>
            </StyledFixedBottom>
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

const StyledCheckIcon = styled.i`
  position: absolute;
  right: -30px;
  font-size: 24px;
  font-style: normal;
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
  padding-bottom: 120px;
  margin: 0;

  & .empty {
    padding-top: 60px;
    font-size: 16px;
    color: var(--font-gray);
    opacity: .6;
  }
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

const StyledFixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  right: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100vw;
  background: var(--main-white);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(253,187,45,0) 100%);
`;

const StyledAddQuestionButton = styled.button`
  width: 442px;
  height: 60px;
  margin: 0px auto 60px;
  border-radius: var(--button-border-radius);
  background-color: var(--main-orange);
  color: var(--main-white);
  font-size: 20px;
  font-weight: 500;
  transition: background-color 200ms;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
