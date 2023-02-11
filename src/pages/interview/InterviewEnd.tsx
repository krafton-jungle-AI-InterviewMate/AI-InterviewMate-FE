import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InterviewRadio from "components/layout/interviewEnd/InterviewRadio";
import { StyledBtn } from "styles/StyledBtn";

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

interface InterviewEndProps {
  isAiInterview: boolean; // AI 인터뷰 true, 유저 인터뷰 false
  isInterviewer: boolean; // 면접자 true, 면접관 false
}

function InterviewEnd({ isAiInterview, isInterviewer }: InterviewEndProps) {
  const [eyeScore, setEyeScore] = useState(3);
  const [poseScore, setPoseScore] = useState(3);
  const [answerScore, setAnswerScore] = useState(3);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "면접 시선") {
      setEyeScore(Number(value));
    } else if (name === "면접 자세") {
      setPoseScore(Number(value));
    } else if (name === "면접 답변") {
      setAnswerScore(Number(value));
    }
  };

  useEffect(() => {
    console.log(eyeScore);
    console.log(poseScore);
    console.log(answerScore);
  }, [eyeScore, poseScore, answerScore]);

  return (
    <StyledInterviewEnd>
      <h2>면접 종료!</h2>
      {isAiInterview ? (
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
          <InterviewRadio handleChange={handleChange} labelName="면접 시선" />
          <InterviewRadio handleChange={handleChange} labelName="면접 자세" />
          <InterviewRadio handleChange={handleChange} labelName="면접 답변" />
          <Link to="/lobby">
            <StyledBtn width="100px" height="32px" color="red">
              나가기
            </StyledBtn>
          </Link>
        </div>
      ) : (
        <div className="userEndContents">
          <InterviewRadio handleChange={handleChange} labelName="면접관 1" />
          <InterviewRadio handleChange={handleChange} labelName="면접관 2" />
          <Link to="/lobby">
            <StyledBtn width="100px" height="32px" color="red">
              나가기
            </StyledBtn>
          </Link>
        </div>
      )}
    </StyledInterviewEnd>
  );
}

export default InterviewEnd;
