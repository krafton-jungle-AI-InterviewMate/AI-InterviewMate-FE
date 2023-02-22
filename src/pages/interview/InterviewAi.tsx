import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { interviewModeAtom, aiInterviewerAtom } from "store/interview/atom";

import InterviewAiContainer from "components/interview/InterviewAiContainer";
import { getAiInterviewerVideo, getAiInterviewerListening } from "lib/interview";
import { JungleManagersSet, AI_VIDEO_WIDTH } from "constants/interview";

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

  const aiInterviewerVideo = useMemo(() => getAiInterviewerVideo(aiInterviewer), [ aiInterviewer ]);
  const aiInterviewerListening = useMemo(() => getAiInterviewerListening(aiInterviewer), [ aiInterviewer ]);
  const videoClassName = useMemo(() => JungleManagersSet.has(aiInterviewer) ? "jungle" : "", [ aiInterviewer ]);

  return (
    <StyledWrap>
      <StyledInterviewerSection>
        <StyledImageWrap w={AI_VIDEO_WIDTH}>
          {interviewMode === "question" ? (
            <video
              width={AI_VIDEO_WIDTH}
              autoPlay
              loop
              muted
              key={aiInterviewerVideo}
              className={videoClassName}
            >
              <source src={aiInterviewerVideo} type="video/mp4" />
            </video>
          ) : (
            <video
              width={AI_VIDEO_WIDTH}
              autoPlay
              loop
              muted
              key={aiInterviewerListening}
              className={videoClassName}
            >
              <source src={aiInterviewerListening} type="video/mp4" />
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

const StyledImageWrap = styled.div<{ w: number }>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  z-index: 9;
  width: ${({ w }) => `${w}px`};
  height: 100%;
  overflow: hidden;
  border-radius: 5px;

  & video {
    border-radius: 5px;
  }

  & video.jungle {
    transform: translateY(14%);
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
