import { selector } from "recoil";
import { motionSnapshotAtom, aiInterviewerAtom } from "./atom";
import {
  BOUNDING_BOX_BUFFER, DISTANCE_THRESHOLD,
} from "constants/faceLandmarkDetection";
import { BoundingBox } from "types/faceLandmarkDetection";
import { getFaceDistance } from "lib/faceLandmarkDetection";

export const boundingBoxSelector = selector({
  key: "BoundingBox",
  get: ({ get }) => {
    const { box } = get(motionSnapshotAtom);
    const buffedBox: BoundingBox = {} as BoundingBox;

    const getPlusBuf = (pos: number) => pos * (1 + BOUNDING_BOX_BUFFER);
    const getMinusBuf = (pos: number) => pos * (1 - BOUNDING_BOX_BUFFER);

    Object.keys(box).forEach((key) => {
      Object.defineProperty(buffedBox, key, {
        value: key.includes("Max") ? getPlusBuf(box[key]) : getMinusBuf(box[key]),
        writable: false,
      });
    });

    return buffedBox;
  },
});

export const distanceThresholdSelector = selector({
  key: "DistanceThreshold",
  get: ({ get }) => {
    const { keypoints } = get(motionSnapshotAtom);

    const { right, left } = getFaceDistance(keypoints);

    const getThreshold = (distance: number) => distance * DISTANCE_THRESHOLD;

    return {
      right,
      left,
      rightThreshold: getThreshold(right),
      leftThreshold: getThreshold(left),
    };
  },
});

export const aiInterviewerGenderSelector = selector({
  key: "AiInterviewerGender",
  get: ({ get }) => {
    const aiInterviewer = get(aiInterviewerAtom);

    switch (aiInterviewer) {
    case "Seoyoung":
      return "Female";
    case "Suhyun":
      return "Female";

    default:
      return "Male";
    }
  },
});
