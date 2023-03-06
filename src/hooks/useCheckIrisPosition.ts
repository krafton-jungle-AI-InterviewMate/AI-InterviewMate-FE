import { useState, useEffect } from "react";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { useRecoilValue } from "recoil";
import { isInterviewerAtom } from "store/interview/atom";

import { checkHorizontalRatio } from "lib/faceLandmarkDetection";

type UseCheckIrisPositionParams = {
  face: FaceLandmarksDetection.Face | null;
}

const useCheckIrisPosition = (params: UseCheckIrisPositionParams) => {
  const {
    face,
  } = params;

  const isInterviewer = useRecoilValue(isInterviewerAtom);

  const [ horizontalRatio, setHorizontalRatio ] = useState(0.5);
  const [ increments, setIncrements ] = useState(0);

  useEffect(() => {
    if (isInterviewer) {
      return;
    }

    if (face) {
      const ratio = checkHorizontalRatio(face.keypoints);
      setHorizontalRatio(ratio);
    }

    const timerId = window.setTimeout(() => {
      setIncrements((curr) => curr + 1);
    }, 1000 * 0.5);

    return (() => {
      window.clearTimeout(timerId);
    });
  }, [ increments ]);

  return {
    horizontalRatio,
  };
};

export default useCheckIrisPosition;
