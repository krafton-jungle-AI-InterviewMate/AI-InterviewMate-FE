import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import { getTimestampText, getQuestionText } from "./utils";
import { timestampToSeconds } from "lib/interview";
import { ScriptWithQuestionTitle } from "api/mypage/types";

type TempTimelineType = {
  type: "eye" | "attitude" | "question";
  timestamp: string;
  handleVideoProgress: (time: number) => void;
  questionCount: number;
  scripts: ScriptWithQuestionTitle[];
};

const ResultTimelineItem = (props: TempTimelineType) => {
  const {
    type,
    timestamp,
    handleVideoProgress,
    questionCount,
    scripts,
  } = props;

  return (
    <TimelineItem>
      <TimelineOppositeContent
        color="var(--font-gray)"
        sx={{
          cursor: "pointer",
        }}
        onClick={() => handleVideoProgress(timestampToSeconds(timestamp))}
      >
        {timestamp}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          variant={type === "question" ? "filled" : "outlined"}
          sx={{
            boxShadow: "none",
            borderColor:
              type === "question"
                ? "var(--push-gray)"
                : type === "attitude" ? "var(--main-blue)" : "var(--main-orange)",
            backgroundColor:
              type === "question"
                ? "var(--push-gray)"
                : "transparent",
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {
          type === "question"
            ? getQuestionText(questionCount, scripts)
            : getTimestampText(type)
        }
      </TimelineContent>
    </TimelineItem>
  );
};

export default ResultTimelineItem;
