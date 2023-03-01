export type InterviewModeTypes = "break" | "question" | "answer" | "finished";
export type InterviewFeedbackTypes = "iris" | "motion";
export type AiInterviewerTypes =
  | "Seoyoung"
  | "Suhyun"
  | "Donghyun"
  | "Seungmin"
  | "Minho"
  | "Junghan"
  | "Hyunsoo"
  | "Seunghyun";
export type AiInterviewProcessTypes = "ready" | "ongoing" | "end";
export type Timeline = {
  eyes: string[];
  attitude: string[];
  questionModeStart: string[];
};
export type TimelineRecord = {
  startTime: number;
  endTime: number;
  timeline: Timeline;
};
