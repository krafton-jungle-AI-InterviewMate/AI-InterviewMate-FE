import {
  InterviewModeTypes,
  InterviewFeedbackTypes,
  AiInterviewerTypes,
} from "types/interview";

type CommentMode = Exclude<InterviewModeTypes, "question">;
export const InterviewModeComment: { [mode in CommentMode]: string } = {
  break: "잠시 후 질문이 시작됩니다.",
  answer: "답변을 듣고 있습니다.",
  finished: "면접이 종료되었습니다.",
} as const;

export const ANSWER_LIMIT_SECONDS = 30;

export const IRIS_PERFECT_SCORE = 100;
export const MOTION_PERFECT_SCORE = 100;

export const InterviewFeedbackComment: { [type in InterviewFeedbackTypes]: string } = {
  iris: "화면에 집중하세요.",
  motion: "올바른 자세를 유지하세요.",
} as const;

const JungleManagers: Array<AiInterviewerTypes> = [
  "Junghan",
  "Hyunsoo",
  "Seunghyun",
];
export const JungleManagersSet = new Set(JungleManagers);

export const AiInterviewers: Array<AiInterviewerTypes> = [
  "Minho",
  "Seungmin",
  "Donghyun",
  "Suhyun",
  "Seoyoung",
  ...JungleManagers,
];


export const AI_VIDEO_WIDTH = 640;

export const FeedbackArr = [ "ON", "OFF" ];
