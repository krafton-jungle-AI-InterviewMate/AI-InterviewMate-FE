import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { interviewModeAtom, aiInterviewerAtom } from "store/interview/atom";

import InterviewAiContainer from "components/interview/InterviewAiContainer";
import { getAiInterviewerVideo, getAiInterviewerListening } from "lib/interview";

import styled from "@emotion/styled";
import { commonButtonStyle } from "styles/common";

const InterviewAi = () => {
  const navigate = useNavigate();

  const interviewMode = useRecoilValue(interviewModeAtom);
  const aiInterviewer = useRecoilValue(aiInterviewerAtom);

  const handleExitButton = () => {
    // TODO: 컨펌 팝업
    navigate("/lobby");
  };

  return (
    <StyledWrap>
      <StyledInterviewerSection>
        <StyledImageWrap>
          {interviewMode === "question" ? (
            <video width={200} autoPlay loop muted key={getAiInterviewerVideo(aiInterviewer)}>
              <source src={getAiInterviewerVideo(aiInterviewer)} type="video/mp4" />
            </video>
          ) : (
            <video width={200} autoPlay loop muted key={getAiInterviewerListening(aiInterviewer)}>
              <source src={getAiInterviewerListening(aiInterviewer)} type="video/mp4" />
            </video>
          )}
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

  & img {
    width: 200px;
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
