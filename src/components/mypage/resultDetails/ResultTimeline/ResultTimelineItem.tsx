import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import { getTimestampText } from "./utils";
import { timestampToSeconds } from "lib/interview";

type TempTimelineType = {
  type: "eye" | "attitude" | "question";
  timestamp: string;
  handleVideoProgress: (time: number) => void;
};

const ResultTimelineItem = (props: TempTimelineType) => {
  const {
    type,
    timestamp,
    handleVideoProgress,
  } = props;

  return (
    <TimelineItem>
      <TimelineOppositeContent
        color="var(--font-gray)"
        sx={{ cursor: "pointer" }}
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
        {getTimestampText(type)}
      </TimelineContent>
    </TimelineItem>
  );
};

export default ResultTimelineItem;
