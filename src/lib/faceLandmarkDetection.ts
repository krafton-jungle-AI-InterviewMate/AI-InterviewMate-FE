import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { POINTS } from "constants/faceLandmarkDetection";
import { BoundingBox } from "types/faceLandmarkDetection";

export const checkHorizontalRatio = (kp: Keypoint[]) => {
  const eyeRightWidth = kp[POINTS.EYE_RIGHT_END].x - kp[POINTS.EYE_RIGHT_START].x;
  const eyeLeftWidth = kp[POINTS.EYE_LEFT_END].x - kp[POINTS.EYE_LEFT_START].x;

  const pupilRightPos = kp[POINTS.PUPIL_RIGHT].x - kp[POINTS.EYE_RIGHT_START].x;
  const pupilLeftPos = kp[POINTS.PUPIL_LEFT].x - kp[POINTS.EYE_LEFT_START].x;

  const pupilRight = pupilRightPos / eyeRightWidth;
  const pupilLeft = pupilLeftPos / eyeLeftWidth;

  return Number(((pupilRight + pupilLeft) / 2).toFixed(2));
};

export const isInsideHitBox = (hitBox: BoundingBox, coords: BoundingBox) => {
  const {
    xMin: hitBoxXMin,
    xMax: hitBoxXMax,
    yMin: hitBoxYMin,
    yMax: hitBoxYMax,
  } = hitBox;

  const { xMin, xMax, yMin, yMax } = coords;

  return (
    xMin > hitBoxXMin
    && xMax < hitBoxXMax
    && yMin > hitBoxYMin
    && yMax < hitBoxYMax
  );
};

/** https://mathbang.net/138 */
const getDistanceBetweenTwoKeypoints = (kp1: Keypoint, kp2: Keypoint) => {

  const dis_x = kp1.x - kp2.x;
  const dis_y = kp1.y - kp2.y;

  return Math.sqrt(Math.abs(dis_x * dis_x) + Math.abs(dis_y * dis_y));
};

type FaceDistance = {
  right: number;
  left: number;
};
/**
 * right distance: from 127 to 33
 * left distance: from 263 to 356
 */
export const getFaceDistance: (kp: Keypoint[]) => FaceDistance = (kp) => {
  const rightDistance =
    getDistanceBetweenTwoKeypoints(kp[POINTS.RIGHT_EAR], kp[POINTS.EYE_RIGHT_START]);
  const leftDistance =
    getDistanceBetweenTwoKeypoints(kp[POINTS.LEFT_EAR], kp[POINTS.EYE_LEFT_END]);

  return {
    right: rightDistance,
    left: leftDistance,
  };
};

type FaceDistanceWithThreshold = FaceDistance & {
  rightThreshold: number;
  leftThreshold: number;
}
export const isFaceDistanceStable = (
  initDistance: FaceDistanceWithThreshold,
  currDistance: FaceDistance,
) => {
  const isHeadTurnRightSafely =
    (initDistance.rightThreshold < currDistance.right)
    && (initDistance.right > currDistance.right);
  const isHeadTurnLeftSafely =
    (initDistance.leftThreshold < currDistance.left)
    && (initDistance.left > currDistance.left);

  return isHeadTurnRightSafely || isHeadTurnLeftSafely;
};
