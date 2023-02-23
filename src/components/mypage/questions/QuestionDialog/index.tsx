import { useState, useEffect } from "react";

import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import { IoMdClose } from "react-icons/io";

import { usePutQuestionDetails } from "hooks/queries/questionBoxes";
import { Question } from "api/questionBoxes/type";
import { KEYWORD_NUMBER_LIMIT } from "constants/mypage";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const modalStyles: ModalProps["styles"] = {
  root: {
    top: "80px",
  },
  modal: {
    position: "relative",
    width: "900px",
    height: "420px",
    padding: "69px 67px",
    boxShadow: "var(--box-shadow)",
    borderRadius: "15px",
  },
};

type QuestionDialogProps = {
  isModifying: boolean;
  currQuestion: Question | null;
  isOpen: boolean;
  handleClose: () => void;
}

const QuestionDialog = (props: QuestionDialogProps) => {
  const {
    isModifying,
    currQuestion,
    isOpen,
    handleClose,
  } = props;

  const [ questionTitle, setQuestionTitle ] = useState(isModifying ? currQuestion?.questionTitle : "");
  const [ keyword, setKeyword ] = useState("");
  const [ keywordList, setKeywordList ] = useState<string[]>([]);

  const addKeyword = () => {
    if (!keyword.length) {
      return;
    }

    setKeywordList((curr) => ([ ...curr, keyword ]));
    setKeyword("");
  };
  const removeKeyword = (targetIdx: number) => {
    setKeywordList((curr) => curr.filter((_, idx) => targetIdx !== idx));
  };

  const handleQuestionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
  };
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleKeywordRemove = (targetIdx: number) => {
    removeKeyword(targetIdx);
  };
  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addKeyword();
    }
  };

  useEffect(() => {
    if (isModifying && currQuestion) {
      let keywords =
        new Array(KEYWORD_NUMBER_LIMIT)
          .fill("")
          .map((_, idx) => currQuestion[`keyword${idx + 1}`]);

      keywords = keywords.filter((k) => k);
      setKeywordList(keywords);
    }
  }, [ currQuestion ]);

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      styles={modalStyles}
    >
      <StyledKeywordWrap>
        {keywordList.map((k, idx) =>
          <StyledKeyword key={idx}>
            <button
              type="button"
              className="closeButton"
              aria-label="키워드 삭제하기"
              title="키워드 삭제하기"
              onClick={() => handleKeywordRemove(idx)}
            >
              <IoMdClose size={16} />
            </button>
            <span>{k}</span>
          </StyledKeyword>,
        )}
      </StyledKeywordWrap>

      <StyledH2>{isModifying ? "질문 수정하기" : "질문 추가하기"}</StyledH2>

      <StyledFormWrap>
        <StyledInputWrap>
          <StyledLabel htmlFor="question-title">질문</StyledLabel>
          <StyledInput
            type="text"
            id="question-title"
            value={questionTitle}
            onChange={handleQuestionTitleChange}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <StyledLabel htmlFor="question-keywords">키워드</StyledLabel>
          <StyledInput
            type="text"
            id="question-keywords"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyUp={handleKeywordEnter}
          />
          <StyledSmall>키워드는 최대 {KEYWORD_NUMBER_LIMIT}개까지 추가하실 수 있습니다.</StyledSmall>
          {keywordList.length < KEYWORD_NUMBER_LIMIT && (
            <StyledKeywordButton onClick={addKeyword}>+ 추가하기</StyledKeywordButton>
          )}
        </StyledInputWrap>
      </StyledFormWrap>
      <StyledButtonWrap>
        <StyledConfirmButton type="button">확인</StyledConfirmButton>
        <StyledCancelButton type="button" onClick={handleClose}>취소</StyledCancelButton>
      </StyledButtonWrap>
    </Modal>
  );
};

export default QuestionDialog;

const commonFlexStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledFormWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 42px auto 160px;
`;

const StyledH2 = styled.h2`
  font-weight: 500;
  font-size: 24px;
  margin: 0;
  `;

const StyledInputWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  margin-top: 36px;
`;

const StyledLabel = styled.label`
  text-align: left;
  font-size: 16px;
  color: var(--main-black);
`;

const StyledInput = styled.input`
  width: 480px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid var(--main-black);
  padding-left: 10px;
`;

const StyledKeywordButton = styled.button`
  position: absolute;
  right: -176px;
  ${commonFlexStyle};
  width: 160px;
  height: 32px;
  color: var(--main-white);
  background-color: var(--main-black);
  border-radius: var(--button-border-radius);
`;

const StyledSmall = styled.small`
  position: absolute;
  bottom: -26px;
  left: 65px;
  font-size: 12px;
  color: var(--font-gray);
`;

const StyledKeywordWrap = styled.div`
  position: absolute;
  ${commonFlexStyle};
  top: 300px;
  left: 132px;
  margin-top: 26px;
`;

const StyledKeyword = styled.div`
  ${commonFlexStyle};
  height: 28;
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  border-radius: 3px;
  box-shadow: var(--box-shadow);
  font-size: 14px;
  color: var(--font-gray);
  margin-right: 24px;
  padding: 6px 8px;

  & .closeButton {
    background-color: transparent;
    padding: 4px;
    color: var(--font-gray);
    transform: translateY(1px);
  }
`;

const StyledButtonWrap = styled.div`
  ${commonFlexStyle};
  margin: 0 auto;
`;

const commonButtonStyle = css`
  ${commonFlexStyle};
  width: 300px;
  height: 54px;
  border-radius: var(--button-border-radius);
`;

const StyledConfirmButton = styled.button`
  ${commonButtonStyle}
  margin-right: 48px;

  background-color: var(--main-orange);
  color: var(--main-white);

  transition: all 200ms;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

const StyledCancelButton = styled.button`
  ${commonButtonStyle}

  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);

  transition: all 200ms;

  &:hover {
    background-color: var(--main-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
