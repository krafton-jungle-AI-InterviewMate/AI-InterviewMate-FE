import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import { getTimestampText } from "./utils";

type TempTimelineType = {
  type: "eye" | "attitude" | "question";
  timestamp: string;
};

const ResultTimelineItem = (props: TempTimelineType) => {
  const {
    type,
    timestamp,
  } = props;

  return (
    <TimelineItem>
      <TimelineOppositeContent color="var(--font-gray)">
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
