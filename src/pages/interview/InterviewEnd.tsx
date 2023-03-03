import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { StyledBtn } from "styles/StyledBtn";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aiInterviewNextProcessAtom,
  interviewCommentAtom,
  interviewDataAtom,
  isInterviewerAtom,
} from "store/interview/atom";
import { usePostResultComment } from "hooks/queries/mypage";

const InterviewEnd = () => {
  const setAiInterviewNextProcess = useSetRecoilState(aiInterviewNextProcessAtom);
  const [comment, setComment] = useRecoilState(interviewCommentAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const interviewData = useRecoilValue(interviewDataAtom);

  const { mutate } = usePostResultComment();

  const textarea = useRef<any>(0);

  const handleResizeHeight = () => {
    setComment(textarea.current.value);
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const handleClickCommentSave = () => {
    mutate(
      {
        roomIdx: interviewData!.roomIdx,
        comment: comment,
      },
      {
        onSuccess: () => {
          console.log("저장하고 나가기");
        },
        onError(error) {
          alert(error);
        },
      },
    );
  };

  useEffect(() => {
    setAiInterviewNextProcess("ready");
  }, []);

  return (
    <StyledInterviewEnd>
      <>
        <h2>면접 종료!</h2>
        {interviewData?.roomType === "AI" ? (
          <div className="aiEndContents">
            <p>수고하셨습니다.</p>
            <span>면접 결과는 마이페이지에서 확인하실 수 있습니다.</span>
            <Link to="/lobby">
              <StyledBtn width="100px" height="32px" color="red">
                나가기
              </StyledBtn>
            </Link>
          </div>
        ) : isInterviewer ? (
          <div className="userEndContents">
            <p>면접자를 위한 코멘트를 남겨주세요.</p>
            <div>
              <textarea
                onChange={handleResizeHeight}
                value={comment}
                ref={textarea}
                name="comment"
                id="comment"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <Link to="/lobby">
              <StyledBtn onClick={handleClickCommentSave} width="150px" height="32px" color="red">
                저장하고 나가기
              </StyledBtn>
            </Link>
          </div>
        ) : (
          <div className="aiEndContents">
            <p>수고하셨습니다.</p>
            <span>면접 결과는 마이페이지에서 확인하실 수 있습니다.</span>
            <Link to="/lobby">
              <StyledBtn width="100px" height="32px" color="red">
                나가기
              </StyledBtn>
            </Link>
          </div>
        )}
      </>
    </StyledInterviewEnd>
  );
};

const StyledInterviewEnd = styled.div`
  color: var(--main-black);
  h2 {
    margin: 50px 0;
    font-size: 36px;
  }
  .aiEndContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 78px;
    border-radius: 15px;
    border: 1px solid var(--main-gray);
    background-color: var(--main-white);
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04));
    p {
      margin: 0px 0px 80px;
      font-size: 20px;
    }
    span {
      font-size: 12px;
      color: var(--font-gray);
      margin-bottom: 15px;
    }
  }
  .userEndContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 78px;
    border-radius: 15px;
    border: 1px solid var(--main-gray);
    background-color: var(--main-white);
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04));
    p {
      font-size: 20px;
      margin: 0 0 80px;
    }
    textarea {
      width: 315px;
      height: auto;
      padding: 5px;
      margin-bottom: 100px;
      font-size: 20px;
      font-weight: bold;
      border: 1px solid var(--font-gray);
      border-radius: 7px;
      overflow: hidden;
    }
  }
`;

export default InterviewEnd;
