import { useState, useEffect } from "react";

import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import { IoMdClose } from "react-icons/io";

import {
  usePutQuestionDetails,
  usePostQuestionDetails,
} from "hooks/queries/questionBoxes";
import {
  Question,
  PutQuestionDetailsPayload,
  PostQuestionDetailsPayload,
  CommonQuestionDetailsPayload,
} from "api/questionBoxes/type";
import {
  QUESTION_TITLE_LENGTH_LIMIT, KEYWORD_NUMBER_LIMIT,
  KEYWORD_LENGTH_LIMIT, ERROR_MSG,
} from "./constants";

import * as Styled from "./styles";

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
    overflow: "hidden",
  },
};

type QuestionDialogProps = {
  isModifying: boolean;
  currQuestion: Question | null;
  questionBoxIdx: number;
  refetch: () => void;
  isOpen: boolean;
  handleClose: () => void;
}

const QuestionDialog = (props: QuestionDialogProps) => {
  const {
    isModifying,
    currQuestion,
    questionBoxIdx,
    refetch,
    isOpen,
    handleClose,
  } = props;

  const [ questionTitle, setQuestionTitle ] = useState(
    isModifying ? currQuestion?.questionTitle ?? "" : "",
  );
  const [ keyword, setKeyword ] = useState("");
  const [ keywordList, setKeywordList ] = useState<string[]>([]);

  const {
    mutate: updateQuestion,
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = usePutQuestionDetails();

  const {
    mutate: postQuestion,
    isLoading: isPosting,
    isSuccess: isPostSuccess,
    isError: isPostError,
  } = usePostQuestionDetails();

  const addKeyword = () => {
    if (!keyword.length || keyword.length > KEYWORD_LENGTH_LIMIT) {
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
  const handleSubmit = () => {
    if (questionTitle.length > QUESTION_TITLE_LENGTH_LIMIT) {
      return;
    }
    if (keywordList.length <= 0) {
      return;
    }

    const commonPayload: CommonQuestionDetailsPayload = {
      questionTitle,
      keyword1: keywordList[0],
    };

    keywordList.forEach((k, idx) => {
      Object.assign(commonPayload, {
        [`keyword${idx + 1}`]: k,
      });
    });

    if (isModifying) {
      if (!currQuestion) {
        return;
      }

      const payload: PutQuestionDetailsPayload = {
        ...commonPayload,
        questionIdx: currQuestion.questionIdx,
      };

      updateQuestion(payload);
      return;
    }

    const payload: PostQuestionDetailsPayload = {
      ...commonPayload,
      questionBoxIdx,
    };

    postQuestion(payload);
  };

  const handleAfterSubmit = () => {
    refetch();
    handleClose();
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

  useEffect(() => {
    if (isUpdateSuccess || isPostSuccess) {
      handleAfterSubmit();
    }
    else if (isUpdateError || isPostError) {
      window.alert(ERROR_MSG);
    }
  }, [ isUpdating, isPosting ]);

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      styles={modalStyles}
    >
      <Styled.KeywordWrap>
        {keywordList.map((k, idx) =>
          <Styled.Keyword key={idx}>
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
          </Styled.Keyword>,
        )}
      </Styled.KeywordWrap>

      <Styled.H2>{isModifying ? "질문 수정하기" : "질문 추가하기"}</Styled.H2>

      <Styled.FormWrap>
        <Styled.InputWrap>
          {questionTitle.length > QUESTION_TITLE_LENGTH_LIMIT && (
            <em role="alert" className="questionTitle">
              질문은 최대 {QUESTION_TITLE_LENGTH_LIMIT}자까지 입력이 가능합니다.
            </em>
          )}
          <Styled.Label htmlFor="question-title">질문</Styled.Label>
          <Styled.Input
            type="text"
            id="question-title"
            value={questionTitle}
            onChange={handleQuestionTitleChange}
          />
        </Styled.InputWrap>

        <Styled.InputWrap>
          <Styled.Label htmlFor="question-keywords">키워드</Styled.Label>
          <Styled.Input
            type="text"
            id="question-keywords"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyUp={handleKeywordEnter}
          />
          <Styled.Small>
            하나 이상의 키워드를 추가해 주세요.
            키워드는 최대 {KEYWORD_NUMBER_LIMIT}개까지 추가하실 수 있습니다.
          </Styled.Small>
          {keywordList.length < KEYWORD_NUMBER_LIMIT && (
            <Styled.KeywordButtonWrap>
              {keyword.length > KEYWORD_LENGTH_LIMIT && (
                <em role="alert" className="questionKeywords">
                  키워드는 최대 {KEYWORD_LENGTH_LIMIT}자까지 입력이 가능합니다.
                </em>
              )}
              <Styled.KeywordButton onClick={addKeyword}>+ 추가하기</Styled.KeywordButton>
            </Styled.KeywordButtonWrap>
          )}
        </Styled.InputWrap>
      </Styled.FormWrap>
      <Styled.ButtonWrap>
        <Styled.ConfirmButton type="button" onClick={handleSubmit}>
          확인
        </Styled.ConfirmButton>
        <Styled.CancelButton type="button" onClick={handleClose}>취소</Styled.CancelButton>
      </Styled.ButtonWrap>
    </Modal>
  );
};

export default QuestionDialog;
