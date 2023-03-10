import { useEffect, useState, useMemo } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  irisCountAtom,
  timelineRecordAtom,
  isInterviewerAtom,
  showIrisFeedbackAtom,
} from "store/interview/atom";
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

  const [ isShowingFeedback, setIsShowingFeedback ] = useState(false);
  const [ showFeedback, setShowFeedback ] = useRecoilState(showIrisFeedbackAtom);
  const setIrisCount = useSetRecoilState(irisCountAtom);
  const [ timelineRecord, setTimelineRecord ] = useRecoilState(timelineRecordAtom);
  const [ increments, setIncrements ] = useState(0);
  const [ feedbackIncrements, setFeedbackIncrements ] = useState(0);
  const isInterviewer = useRecoilValue(isInterviewerAtom);

  const isIrisOutOfCenter = useMemo(() => {
    return (horizontalRatio < THRESHOLD_RIGHT || horizontalRatio > THRESHOLD_LEFT);
  }, [ horizontalRatio ]);

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

    if (isIrisOutOfCenter) {
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
  }, [ isIrisOutOfCenter, isShowingFeedback, feedbackIncrements ]);

  const assess = () => {
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

export default useIrisAssessment;
