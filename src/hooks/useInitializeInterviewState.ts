import { useSetRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  irisCountAtom,
  motionCountAtom,
  answerScriptAtom,
} from "store/interview/atom";

const useInitializeInterviewState = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const setInterviewQuestionNumber = useSetRecoilState(interviewQuestionNumberAtom);
  const setIrisCount = useSetRecoilState(irisCountAtom);
  const setMotionCount = useSetRecoilState(motionCountAtom);
  const setAnswerScript = useSetRecoilState(answerScriptAtom);

  const initializeInterviewState = () => {
    setInterviewMode("break");
    setInterviewQuestionNumber(0); // 질문 리스트 인덱스 초기화
    setIrisCount(0);
    setMotionCount(0);
    setAnswerScript([]);
  };

  return {
    initializeInterviewState,
  };
};

export default useInitializeInterviewState;
