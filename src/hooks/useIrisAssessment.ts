import { useEffect, useState, useMemo } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { irisCountAtom, timelineRecordAtom } from "store/interview/atom";
import { THRESHOLD_LEFT, THRESHOLD_RIGHT } from "constants/faceLandmarkDetection";
import { createTimeline } from "lib/interview";

type UseIrisAssessmentParams = {
  isRealtimeMode: boolean;
  horizontalRatio: number;
};

const useIrisAssessment = (params: UseIrisAssessmentParams) => {
  const {
    isRealtimeMode,
    horizontalRatio,
  } = params;

  const [ showFeedback, setShowFeedback ] = useState(false);
  const setIrisCount = useSetRecoilState(irisCountAtom);
  const [ timelineRecord, setTimelineRecord ] = useRecoilState(timelineRecordAtom);
  const [ increments, setIncrements ] = useState(0);

  const isIrisOutOfCenter = useMemo(() => {
    return (horizontalRatio < THRESHOLD_RIGHT || horizontalRatio > THRESHOLD_LEFT);
  }, [ horizontalRatio ]);

  const assess = () => {
    if (isRealtimeMode) {
      setShowFeedback(isIrisOutOfCenter);
    }

    if (isIrisOutOfCenter) {
      setIrisCount((curr) => curr + 1);
      setTimelineRecord((curr) => ({
        ...curr,
        timeline: {
          ...curr.timeline,
          eyes: [ ...curr.timeline.eyes, createTimeline(timelineRecord.startTime) ],
        },
      }));
    }
  };

  useEffect(() => {
    assess();

    const timerId = window.setTimeout(() => {
      setIncrements((curr) => curr + 1);
    }, 1000 * 1);

    return (() => {
      window.clearTimeout(timerId);
    });
  }, [ increments ]);

  return {
    showFeedback,
  };
};

export default useIrisAssessment;
