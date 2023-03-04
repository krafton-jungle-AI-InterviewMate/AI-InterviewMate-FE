import { useSetRecoilState } from "recoil";
import {
  interviewModeAtom,
  interviewQuestionNumberAtom,
  irisCountAtom,
  motionCountAtom,
  answerScriptAtom,
  timelineRecordAtom,
  videoBlobAtom,
  videoUrlAtom,
} from "store/interview/atom";
import { InitialTimelineRecord } from "constants/interview";

const useInitializeInterviewState = () => {
  const setInterviewMode = useSetRecoilState(interviewModeAtom);
  const setInterviewQuestionNumber = useSetRecoilState(interviewQuestionNumberAtom);
  const setIrisCount = useSetRecoilState(irisCountAtom);
  const setMotionCount = useSetRecoilState(motionCountAtom);
  const setAnswerScript = useSetRecoilState(answerScriptAtom);
  const setTimelineRecord = useSetRecoilState(timelineRecordAtom);
  const setVideoBlobAtom = useSetRecoilState(videoBlobAtom);
  const setVideoUrlAtom = useSetRecoilState(videoUrlAtom);

  const initializeInterviewState = () => {
    setInterviewMode("break");
    setInterviewQuestionNumber(0); // 질문 리스트 인덱스 초기화
    setIrisCount(0);
    setMotionCount(0);
    setAnswerScript([]);
    setTimelineRecord(InitialTimelineRecord);
    setVideoBlobAtom(null);
    setVideoUrlAtom("");
  };

  return {
    initializeInterviewState,
  };
};

export default useInitializeInterviewState;
