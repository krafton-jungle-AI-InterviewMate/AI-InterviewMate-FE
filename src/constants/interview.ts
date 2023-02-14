import { InterviewModeTypes, InterviewFeedbackTypes } from "types/interview";

type CommentMode = Exclude<InterviewModeTypes, "question">;
export const InterviewModeComment: { [mode in CommentMode]: string } = {
  break: "잠시 후 질문이 시작됩니다.",
  answer: "답변을 듣고 있습니다.",
  finished: "면접이 종료되었습니다. 제출을 원하시면 아래 버튼을 눌러주세요.",
} as const;

export const ANSWER_LIMIT_SECONDS = 30;

export const IRIS_PERFECT_SCORE = 100;
export const MOTION_PERFECT_SCORE = 100;

export const InterviewFeedbackComment: { [type in InterviewFeedbackTypes]: string } = {
  iris: "화면에 집중하세요.",
  motion: "올바른 자세를 유지하세요.",
} as const;
