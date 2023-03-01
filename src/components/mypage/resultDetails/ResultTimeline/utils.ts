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
