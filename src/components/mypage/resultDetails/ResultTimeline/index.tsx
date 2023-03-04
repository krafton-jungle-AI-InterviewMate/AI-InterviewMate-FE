import { useState, useEffect, useMemo } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import ResultTimelineItem from "./ResultTimelineItem";
import { VideoJsPlayer as Player } from "video.js";

import throttle from "lodash.throttle";
import { createTimestampFromSeconds, mapQuestionsIdx } from "./utils";
import { RatingDetail } from "api/mypage/types";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultTimelineProps = {
  data: RatingDetail;
  videoRef: React.MutableRefObject<Player | null>;
};

const ResultTimeline = (props: ResultTimelineProps) => {
  const {
    data,
    videoRef,
  } = props;

  const [ duration, setDuration ] = useState<number | null>(0);
  const [ currentTime, setCurrentTime ] = useState<number | null>(null);

  const questionsIdx = useMemo(() => {
    return mapQuestionsIdx(data.timelines);
  }, [ data ]);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const setVideoDuration = () => {
        const videoDuration = video.duration();
        setDuration(videoDuration || null);
      };
      const setVideoCurrentTime = () => {
        const videoCurrentTime = video?.currentTime();
        setCurrentTime(videoCurrentTime || null);
      };
      const throttledTimeSetter = throttle(setVideoCurrentTime, 500);

      video.on("loadedmetadata", setVideoDuration);
      video.on("timeupdate", throttledTimeSetter);
    }
  }, [ videoRef ]);

  const handleVideoProgress = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime(time);
    }
  };

  return videoRef.current ? (
    <StyledTimelineWrap>
      <StyledTitle>타임라인</StyledTitle>

      <StyledScrollBox>
        <Timeline>

          <TimelineItem>
            <TimelineOppositeContent
              color="var(--font-gray)"
            >
              00:00
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  boxShadow: "none",
                  borderColor: "var(--push-gray)",
                  backgroundColor: "var(--push-gray)",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>면접 시작</TimelineContent>
          </TimelineItem>

          {data.timelines.map((timestamp, idx) =>
            <ResultTimelineItem
              key={idx}
              handleVideoProgress={handleVideoProgress}
              questionCount={questionsIdx[idx] ?? 0}
              scripts={data.scripts}
              {...timestamp}
            />,
          )}

          {/* LAST ITEM */}
          <TimelineItem>
            <TimelineOppositeContent
              color="var(--font-gray)"
            >
              {createTimestampFromSeconds(Math.floor(duration ?? 0))}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  boxShadow: "none",
                  borderColor: "var(--push-gray)",
                  backgroundColor: "var(--push-gray)",
                }}
              />
            </TimelineSeparator>
            <TimelineContent>면접 종료</TimelineContent>
          </TimelineItem>

        </Timeline>
      </StyledScrollBox>
    </StyledTimelineWrap>
  ) : null;
};

export default ResultTimeline;

const StyledTimelineWrap = styled.div`
  flex-grow: 1;
  margin-left: 40px;
  align-self: flex-start;
  height: 542px;

  & * {
    font-size: 20px;
    font-weight: 500;
  }
`;

const StyledTitle = styled.h3`
  margin: 0;
  ${commonLabelStyle}
  padding: 0;
  text-align: left;
`;

const StyledScrollBox = styled.div`
  height: calc(100% - 40px);
  overflow-y: auto;
  border-radius: 16px;
  padding: 10px;
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;

  & * {
    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .06);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, .2);
  }
`;
