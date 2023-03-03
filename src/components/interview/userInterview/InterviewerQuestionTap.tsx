import { StyledBtn } from "styles/StyledBtn";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { interviewCommentAtom, interviewDataAtom } from "store/interview/atom";
import styled from "@emotion/styled";

type Tab = "question" | "comment";

const InterviewQuestionTab = () => {
  const userInterviewData = useRecoilValue(interviewDataAtom);
  const [comment, setComment] = useRecoilState(interviewCommentAtom);

  const [tabName, setTabName] = useState<Tab>("question");

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTabName(event.currentTarget.name as Tab);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const textarea = useRef<any>(0);

  const handleResizeHeight = () => {
    setComment(textarea.current.value);
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  return (
    <StyledInterviewQuestionTab>
      <div className="contentsTab">
        <StyeldTabBtn
          width="200px"
          height="48px"
          color="orange"
          name="question"
          onClick={handleClickTab}
          className={tabName === "question" ? "active" : ""}
        >
          답안지
        </StyeldTabBtn>
        <StyeldTabBtn
          width="200px"
          height="48px"
          color="orange"
          name="comment"
          onClick={handleClickTab}
          className={tabName === "comment" ? "active" : ""}
        >
          피드백
        </StyeldTabBtn>
      </div>
      <div className="contents">
        {tabName === "question" ? (
          userInterviewData?.questionList.map(q => (
            <div key={q.questionIdx} className="questions">
              <h2 className="questionTitle">
                <span>Q.</span>
                <p>{q.questionTitle}</p>
              </h2>
              <p className="questionKeyword">
                <span>키워드</span>
                {q.keyword1 && `${q.keyword1}`}
                {q.keyword2 && `, ${q.keyword2}`}
                {q.keyword3 && `, ${q.keyword3}`}
                {q.keyword4 && `, ${q.keyword4}`}
                {q.keyword5 && `, ${q.keyword5}`}
              </p>
            </div>
          ))
        ) : (
          <div className="comment">
            <span>면접에 대한 피드백을 작성해주세요.</span>
            <form onSubmit={handleSubmit}>
              <textarea
                onChange={handleResizeHeight}
                name="interviewComment"
                id="interviewComment"
                cols={30}
                rows={10}
                ref={textarea}
                value={comment}
                spellCheck={false}
              ></textarea>
            </form>
          </div>
        )}
      </div>
    </StyledInterviewQuestionTab>
  );
};

const StyledInterviewQuestionTab = styled.div`
  margin-left: 100px;
  text-align: left;
  .contentsTab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .contents {
    padding: 47px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid var(--push-orange);
    border-radius: 15px;
    .questions {
      margin-bottom: 20px;
      width: 326px;
      .questionTitle {
        font-size: 16px;
        font-weight: 400;
        color: var(--main-black);
        margin: 0 0 10px 0;
        p {
          margin: 0;
          display: inline;
        }
        span {
          font-size: 24px;
          color: var(--font-gray);
          margin-right: 20px;
        }
      }
      .questionKeyword {
        font-size: 16px;
        font-weight: 400;
        color: var(--main-black);
        margin: 0;
        span {
          font-size: 16px;
          font-weight: 400;
          color: var(--font-gray);
          margin-right: 10px;
        }
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: 400;
      color: var(--main-black);
      span {
        margin-bottom: 30px;
      }
      textarea {
        width: 314px;
        height: auto;
        font-size: 20px;
        font-weight: 400;
        border-radius: 7px;
        border: 1px solid var(--font-gray);
        padding: 5px;
        overflow: hidden;
      }
      button {
        align-self: flex-end;
      }
    }
  }
`;

const StyeldTabBtn = styled(StyledBtn)`
  &.active {
    background-color: var(--push-orange);
  }
`;

export default InterviewQuestionTab;
