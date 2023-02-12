import { useEffect, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { irisScoreAtom } from "store/interview/atom";
import { THRESHOLD_LEFT, THRESHOLD_RIGHT } from "constants/faceLandmarkDetection";

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
  const [ _, setIrisScore ] = useRecoilState(irisScoreAtom);
  const [ increments, setIncrements ] = useState(0);

  const isIrisOutOfCenter = useMemo(() => {
    return (horizontalRatio < THRESHOLD_RIGHT || horizontalRatio > THRESHOLD_LEFT);
  }, [ horizontalRatio ]);

  const assess = () => {
    if (isRealtimeMode) {
      setShowFeedback(isIrisOutOfCenter);
    }

    if (isIrisOutOfCenter) {
      setIrisScore((curr) => curr - 1);
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
