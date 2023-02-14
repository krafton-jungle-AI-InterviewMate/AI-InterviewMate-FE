import { useEffect, useMemo } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { interviewModeAtom, interviewQuestionNumberAtom } from "store/interview/atom";

import InterviewComment from "../InterviewComment";

import styled from "@emotion/styled";
import questions from "components/interview/_mock/questions";

type QuestionModeControllerProps = {
  questionList: string[];
};

const QuestionModeController = (props: QuestionModeControllerProps) => {
  const { questionList } = props;

  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const [interviewQuestionNumber, setInterviewQuestionNumber] = useRecoilState(
    interviewQuestionNumberAtom,
  );

  // ! FIXME: 실제로는 음성 플레이 종료 시점을 기준으로 인터뷰 모드 변경
  // useEffect(() => {
  //   const timerId = window.setTimeout(() => {
  //     setInterviewMode("answer");
  //     setInterviewQuestionNumber(curr => curr + 1);
  //   }, 1000 * 5);

  //   return () => {
  //     window.clearTimeout(timerId);
  //   };
  // }, []);

  console.log(interviewQuestionNumber);

  const msg = useMemo(() => new SpeechSynthesisUtterance(), []);

  useEffect(() => {
    if (msg) {
      msg.text = questions[interviewQuestionNumber]; // 읽을 텍스트
      msg.lang = "ko-KR"; // 언어
      msg.rate = 1; // 말하는 속도
      msg.pitch = 1; // 말하는 톤

      // const voice = speechSynthesis.getVoices()[0]; // 기본 목소리
      const voice = speechSynthesis.getVoices()[12]; // 트위치 TTS 목소리
      msg.voice = voice; // 말하는 목소리

      msg.onend = () => {
        // 말하기가 끝난 후 실행
        setInterviewMode("answer");
        setInterviewQuestionNumber(curr => curr + 1);
      };

      const synth = window.speechSynthesis;
      synth.speak(msg); // 말하기

      return () => {
        synth.cancel(); // 삭제
      };
    }
  }, [msg]);

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          <span>Q.</span>
          {questionList[interviewQuestionNumber]}
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default QuestionModeController;

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
  font-size: 20px;
  font-weight: 400;
  color: var(--main-black);

  & span {
    font-weight: 700;
    margin-right: 20px;
  }
`;
