import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { boundingBoxSelector, distanceThresholdSelector } from "store/interview/selector";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { isInsideHitBox, getFaceDistance, isFaceDistanceStable } from "lib/faceLandmarkDetection";

type UseCheckHeadMotionParams = {
  face: FaceLandmarksDetection.Face | null;
}

const useCheckHeadMotion = (params: UseCheckHeadMotionParams) => {
  const {
    face,
  } = params;

  const hitBox = useRecoilValue(boundingBoxSelector);
  const distanceThreshold = useRecoilValue(distanceThresholdSelector);

  const [ isBadMotion, setIsBadMotion ] = useState(false);
  const [ increments, setIncrements ] = useState(0);

  useEffect(() => {
    if (face) {
      const { box, keypoints } = face;

      const isInside = isInsideHitBox(hitBox, box);

      const currDistance = getFaceDistance(keypoints);
      const isStable = isFaceDistanceStable(distanceThreshold, currDistance);

      setIsBadMotion(!(isInside && isStable));
    }

    const timerId = window.setTimeout(() => {
      setIncrements((curr) => curr + 1);
    }, 1000 * 0.5);

    return (() => {
      window.clearTimeout(timerId);
    });
  }, [ increments ]);

  return {
    isBadMotion,
  };
};

export default useCheckHeadMotion;
