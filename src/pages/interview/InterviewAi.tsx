import { useNavigate } from "react-router-dom";

import ai from "static/images/robot.jpg";
import InterviewAiContainer from "components/interview/InterviewAiContainer";

import styled from "@emotion/styled";
import { commonButtonStyle } from "styles/common";

const InterviewAi = () => {
  const navigate = useNavigate();

  const handleExitButton = () => {
    // TODO: 컨펌 팝업
    navigate("/lobby");
  };

  return (
    <StyledWrap>
      <StyledInterviewerSection>
        <StyledImageWrap>
          <img src={ai} alt="AI 면접관" />
        </StyledImageWrap>
        <StyledExitButton type="button" onClick={handleExitButton}>
          면접 나가기
        </StyledExitButton>
      </StyledInterviewerSection>
      <InterviewAiContainer />
    </StyledWrap>
  );
};

export default InterviewAi;

const StyledWrap = styled.div`
  width: 100vw;
  min-width: 1000px;
`;

const StyledInterviewerSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;
  background-color: var(--main-gray);
`;

const StyledImageWrap = styled.div`
  position: relative;
  text-align: center;
  z-index: 9;
  width: 200px;
  height: 125px;
  overflow: hidden;
  border-radius: 5px;

  & img {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
  }
`;

const StyledExitButton = styled.button`
  position: absolute;
  top: 30px;
  right: 60px;
  ${commonButtonStyle}
  background-color: var(--main-white);
  color: var(--main-black);
  margin-left: 28px;
  border: 1px solid var(--main-black);

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
    border-color: transparent;
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
