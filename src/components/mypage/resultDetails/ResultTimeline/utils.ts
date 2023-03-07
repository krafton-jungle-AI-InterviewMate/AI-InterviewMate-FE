import { ScriptWithQuestionTitle, Timestamp } from "api/mypage/types";

export const createTimestampFromSeconds = (seconds: number) => {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;

  return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
};

export const getTimestampText = (type: "eye" | "attitude" | "question") => {
  switch (type) {
  case "eye":
    return "시선 이탈";
  case "attitude":
    return "자세 이탈";
  case "question":
    return "질문 시작";

  default:
    return "";
  }
};

export const getQuestionText = (
  questionCount: number,
  scripts: ScriptWithQuestionTitle[],
) => {
  return `Q${questionCount}. ${scripts[questionCount - 1]?.questionTitle ?? ""}`;
};

export const mapQuestionsIdx = (timeline: Timestamp[]) => {
  const questions: { [questionIdx: number]: number } = {};
  let count = 1;

  timeline.forEach(({ type }, idx) => {
    if (type === "question") {
      questions[idx] = count++;
    }
  });

  return questions;
};
