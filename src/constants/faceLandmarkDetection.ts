export const IRIS_START = 468;
export const IRIS_END = 477;

export const PUPIL_RIGHT = 468;
export const PUPIL_LEFT = 473;
export const EYE_RIGHT_START = 33; // *
export const EYE_RIGHT_END = 155;
export const EYE_LEFT_START = 398;
export const EYE_LEFT_END = 263; // *

export const RIGHT_EAR = 127;
export const LEFT_EAR = 356;

export const POINTS = {
  IRIS_START,
  IRIS_END,
  PUPIL_RIGHT,
  PUPIL_LEFT,
  EYE_RIGHT_START,
  EYE_RIGHT_END,
  EYE_LEFT_START,
  EYE_LEFT_END,
  RIGHT_EAR,
  LEFT_EAR,
};

/** iris detection */
export const THRESHOLD_RIGHT = 0.4;
export const THRESHOLD_LEFT = 0.6;

/* head motion detection */
export const BOUNDING_BOX_BUFFER = 0.3;
export const DISTANCE_THRESHOLD = 0.5;
