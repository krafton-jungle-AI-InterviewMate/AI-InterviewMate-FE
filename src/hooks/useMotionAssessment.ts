import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motionScoreAtom } from "store/interview/atom";

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
  const [ _, setMotionScore ] = useRecoilState(motionScoreAtom);
  const [ increments, setIncrements ] = useState(0);

  const assess = () => {
    if (isRealtimeMode) {
      setShowFeedback(isBadMotion);
    }

    if (isBadMotion) {
      setMotionScore((curr) => curr - 1);
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
