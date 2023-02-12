import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { checkHorizontalRatio } from "lib/faceLandmarkDetection";

type UseCheckIrisPositionParams = {
  face: FaceLandmarksDetection.Face | null;
}

const useCheckIrisPosition = (params: UseCheckIrisPositionParams) => {
  const {
    face,
  } = params;

  const [ horizontalRatio, setHorizontalRatio ] = useState(0.5);

  const throttledCheckHorizontalRatio = throttle((kp: FaceLandmarksDetection.Keypoint[]) => {
    const ratio = checkHorizontalRatio(kp);
    setHorizontalRatio(ratio);
  }, 1000 * 1.5);

  useEffect(() => {
    if (face) {
      throttledCheckHorizontalRatio(face.keypoints);
    }
  }, [ face ]);

  return {
    horizontalRatio,
  };
};

export default useCheckIrisPosition;
