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
          variant="outlined"
          color={type === "question" ? "info" : "error"}
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
