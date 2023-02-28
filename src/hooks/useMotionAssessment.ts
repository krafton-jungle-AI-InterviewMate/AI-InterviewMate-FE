import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { motionCountAtom, timelineRecordAtom } from "store/interview/atom";
import { createTimeline } from "lib/interview";

type UseMotionAssessmentParams = {
  isRealtimeMode: boolean;
  isBadMotion: boolean;
};

const useMotionAssessment = (params: UseMotionAssessmentParams) => {
  const {
    isRealtimeMode,
    isBadMotion,
  } = params;

  const [ showFeedback, setShowFeedback ] = useState(false);
  const setMotionCount = useSetRecoilState(motionCountAtom);
  const [ timelineRecord, setTimelineRecord ] = useRecoilState(timelineRecordAtom);
  const [ increments, setIncrements ] = useState(0);

  const assess = () => {
    if (isRealtimeMode) {
      setShowFeedback(isBadMotion);
    }

    if (isBadMotion) {
      setMotionCount((curr) => curr + 1);
      setTimelineRecord((curr) => ({
        ...curr,
        timeline: {
          ...curr.timeline,
          attitude: [ ...curr.timeline.attitude, createTimeline(timelineRecord.startTime) ],
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

export default useMotionAssessment;
