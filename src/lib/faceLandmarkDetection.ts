import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { POINTS, TRIANGULATION } from "constants/faceLandmarkDetection";
import { BoundingBox } from "types/faceLandmarkDetection";

// * Triangle drawing method
const drawPath = (ctx: CanvasRenderingContext2D, points: Keypoint[], closePath: boolean) => {
  // 경로(path) 초기화
  const region = new Path2D();

  // Path2D.moveTo(x, y): 경로의 시작점 명시
  const [ startPoint ] = points;
  region.moveTo(startPoint.x, startPoint.y);

  points.forEach(({ x, y }) => {
    // Path2D.lineTo(x, y): 경로의 마지막 점을 (x, y) 좌표에 직선으로 연결합니다.
    region.lineTo(x, y);
  });

  if (closePath) {
    // Path2D.closePath(): 펜의 점이 현재 하위 경로의 시작 부분으로 다시 이동하게 합니다.
    // 현재 지점에서 출발점까지 직선을 그림으로써 모양을 닫습니다.
    // 만약 모양이 이미 닫혀 있거나 하나의 점만 있으면 이 메서드는 아무것도 하지 않습니다.
    region.closePath();
  }

  // CanvasRenderingContext2D.stroke():
  // strokes (outlines) the current or given path
  // with the current stroke style.
  ctx.strokeStyle = "pink";
  ctx.stroke(region);
};

const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle?: string) => {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fillStyle = fillStyle ?? "aqua";
  ctx.fill();
};

const drawIndex = (ctx: CanvasRenderingContext2D, x: number, y: number, index: number) => {
  ctx.font = "12px sans-serif";
  ctx.fillText(String(index), x, y);
};

type DrawFaceMeshParams = {
  keypoints: Keypoint[];
  ctx: CanvasRenderingContext2D;
  isShowIndex: boolean;
}
export const drawFaceMesh = (params: DrawFaceMeshParams) => {
  const {
    keypoints,
    ctx,
    isShowIndex,
  } = params;

  // * Draw triangles
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    // 삼각형의 세 꼭짓점 묶기
    const indexes = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ];

    const points = indexes.map(point => keypoints[point]);

    drawPath(ctx, points, true);
  }

  // * Draw the points
  keypoints.forEach((keypoint, idx) => {
    const { x, y, name } = keypoint;

    drawPoint(ctx, x, y);
    if (isShowIndex) {
      drawIndex(ctx, x, y, idx + 468);
    }
  });

  // 홍채 그리기
  const irisPoints = keypoints.slice(POINTS.IRIS_START, POINTS.IRIS_END + 1);
  irisPoints.forEach((keypoint, idx) => {
    const { x, y } = keypoint;

    drawPoint(ctx, x, y, "red");
    if (isShowIndex) {
      drawIndex(ctx, x, y, idx + 468);
    }
  });
};

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
