import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { StyledBtn } from "styles/StyledBtn";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aiInterviewNextProcessAtom,
  interviewCommentAtom,
  interviewDataAtom,
  isInterviewerAtom,
} from "store/interview/atom";

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
  }
`;

const InterviewEnd = () => {
  const setAiInterviewNextProcess = useSetRecoilState(aiInterviewNextProcessAtom);
  const [comment, setComment] = useRecoilState(interviewCommentAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const interviewData = useRecoilValue(interviewDataAtom);

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
            <div></div>
            <Link to="/lobby">
              <StyledBtn width="100px" height="32px" color="red">
                나가기
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

export default InterviewEnd;
