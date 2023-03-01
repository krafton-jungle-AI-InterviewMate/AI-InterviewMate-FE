import { useState, useEffect } from "react";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import throttle from "lodash.throttle";
import { createTimestampFromSeconds } from "./utils";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type TempTimelineType = {
  type: "eye" | "attitude" | "question";
  timestamp: string;
};

export type TempResponseType = {
  timeline: TempTimelineType[];
}

type ResultTimelineProps = { // TODO: 실제 response type으로 교체
  data: TempResponseType;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

const ResultTimeline = (props: ResultTimelineProps) => {
  const {
    data,
    videoRef,
  } = props;

  const [ duration, setDuration ] = useState<number | null>(0);
  const [ currentTime, setCurrentTime ] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const setVideoDuration = () => {
        const videoDuration = video?.duration;
        setDuration(videoDuration || null);
      };
      const setVideoCurrentTime = () => {
        const videoCurrentTime = video?.currentTime;
        setCurrentTime(videoCurrentTime || null);
      };
      const throttledTimeSetter = throttle(setVideoCurrentTime, 500);

      video.addEventListener("loadedmetadata", setVideoDuration);
      video.addEventListener("timeupdate", throttledTimeSetter);

      return () => {
        video.removeEventListener("loadedmetadata", setVideoDuration);
        video.removeEventListener("timeupdate", throttledTimeSetter);
      };
    }
  }, [ videoRef ]);

  console.log(data);
  console.log(videoRef);

  return videoRef.current ? (
    <StyledTimelineWrap>
      <StyledTitle>타임라인</StyledTitle>

      <StyledScrollBox>
        <Timeline>

          {/* TODO: 면접 시작 & TimelineItem 컴포넌트 */}
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              09:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="info" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>시선 이탈</TimelineContent>
          </TimelineItem>

          {/* LAST ITEM */}
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {createTimestampFromSeconds(Math.floor(duration ?? 0))}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
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
  margin-left: 30px;
  align-self: flex-start;
  height: 542px;
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

  & * {
    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--main-gray);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--push-gray);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, .2);
  }
`;
