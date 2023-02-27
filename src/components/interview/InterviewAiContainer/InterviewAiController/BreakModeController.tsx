import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { interviewModeAtom, synthesizerAtom, playerAtom } from "store/interview/atom";

import useInitializeSynthesizer from "hooks/useInitializeSynthesizer";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";

const BreakModeController = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const setSynthesizer = useSetRecoilState(synthesizerAtom);
  const setPlayer = useSetRecoilState(playerAtom);

  const {
    player: newPlayer,
    initializeSynthesizer,
  } = useInitializeSynthesizer();

  useEffect(() => {
    (async () => {
      const synth = await initializeSynthesizer();
      setSynthesizer(synth);
      setPlayer(newPlayer);
    })();

    const timerId = window.setTimeout(() => {
      setInterviewMode("question");
    }, 1000 * 3);
  
    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          {InterviewModeComment.break}
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default BreakModeController;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledComment = styled.strong`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 28px;
  font-weight: 400;
`;
