import { InterviewModeTypes } from "types/interview";

type CommentMode = Exclude<InterviewModeTypes, "question">;

export const InterviewModeComment: { [mode in CommentMode]: string } = {
  break: "잠시 후 질문이 시작됩니다.",
  answer: "답변을 듣고 있습니다.",
  finished: "면접이 종료되었습니다. 잠시만 기다려주세요.",
};

export const ANSWER_LIMIT_SECONDS = 30;

export const IRIS_PERFECT_SCORE = 100;
