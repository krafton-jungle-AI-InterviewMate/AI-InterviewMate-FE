import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { motionCountAtom } from "store/interview/atom";

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
  const [ increments, setIncrements ] = useState(0);

  const assess = () => {
    if (isRealtimeMode) {
      setShowFeedback(isBadMotion);
    }

    if (isBadMotion) {
      setMotionCount((curr) => curr + 1);
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
