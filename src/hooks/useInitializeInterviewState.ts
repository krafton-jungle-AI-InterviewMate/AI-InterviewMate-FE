import { useSetRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  irisScoreAtom,
} from "store/interview/atom";
import { IRIS_PERFECT_SCORE } from "constants/interview";

const useInitializeInterviewState = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const setInterviewQuestionNumber = useSetRecoilState(interviewQuestionNumberAtom);
  const setIrisScore = useSetRecoilState(irisScoreAtom);

  const initializeInterviewState = () => {
    setInterviewMode("break");
    setInterviewQuestionNumber(0); // 질문 리스트 인덱스 초기화
    setIrisScore(IRIS_PERFECT_SCORE);
  };

  return {
    initializeInterviewState,
  };
};

export default useInitializeInterviewState;
