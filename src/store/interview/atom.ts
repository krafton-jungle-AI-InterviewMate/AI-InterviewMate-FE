import { atom } from "recoil";
import { InterviewModeTypes } from "types/interview";
import { IRIS_PERFECT_SCORE } from "constants/interview";

/** 인터뷰 프로세스 제어 */
export const interviewModeAtom = atom<InterviewModeTypes>({
  key: "InterviewMode",
  default: "break",
});

export const interviewQuestionNumberAtom = atom<number>({
  key: "InterviewQuestionNumber",
  default: 0,
});

export const interviewQuestionTotalAtom = atom<number>({
  key: "InterviewQuestionTotal",
  default: 0,
});

/** 인터뷰 진행 중 채점 관련 */
export const irisScoreAtom = atom<number>({
  key: "IrisScore",
  default: IRIS_PERFECT_SCORE,
});
