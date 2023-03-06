import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  motionCountAtom,
  timelineRecordAtom,
  isInterviewerAtom,
} from "store/interview/atom";
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

  const [ isShowingFeedback, setIsShowingFeedback ] = useState(false);
  const [ showFeedback, setShowFeedback ] = useState(false);
  const setMotionCount = useSetRecoilState(motionCountAtom);
  const [ timelineRecord, setTimelineRecord ] = useRecoilState(timelineRecordAtom);
  const [ increments, setIncrements ] = useState(0);
  const [ feedbackIncrements, setFeedbackIncrements ] = useState(0);
  const isInterviewer = useRecoilValue(isInterviewerAtom);

  useEffect(() => {
    if (isInterviewer) {
      return;
    }

    if (!isRealtimeMode) {
      return;
    }

    const timerId1 = window.setTimeout(() => {
      setFeedbackIncrements((curr) => curr + 1);
    }, 1000 * 1);
    const timerId2 = window.setTimeout(() => {
      setShowFeedback(false);
      setIsShowingFeedback(false);
    }, 1000 * 3);

    if (isShowingFeedback) {
      return;
    }

    if (isBadMotion) {
      setShowFeedback(true);
      setIsShowingFeedback(true);
    }
    else {
      setShowFeedback(false);
    }

    return (() => {
      window.clearTimeout(timerId1);
      window.clearTimeout(timerId2);
    });
  }, [ isBadMotion, isShowingFeedback, feedbackIncrements ]);

  const assess = () => {
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
    if (isInterviewer) {
      return;
    }

    assess();

    const timerId = window.setTimeout(() => {
      setIncrements((curr) => curr + 1);
    }, 1000 * 0.5);

    return (() => {
      window.clearTimeout(timerId);
    });
  }, [ increments ]);

  return {
    showFeedback,
  };
};

export default useMotionAssessment;
