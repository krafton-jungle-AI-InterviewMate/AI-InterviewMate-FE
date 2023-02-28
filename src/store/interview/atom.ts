import { atom } from "recoil";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { InterviewModeTypes, AiInterviewerTypes } from "types/interview";
import { IRIS_PERFECT_SCORE, MOTION_PERFECT_SCORE } from "constants/interview";
import { PostJoinRoomResponseData, RoomTypes } from "api/interview/type";

/** 인터뷰 프로세스 제어 */
export const faceLandmarksDetectorAtom = atom<null | FaceLandmarksDetection.FaceLandmarksDetector>({
  key: "FaceLandmarksDetector",
  default: null,
  dangerouslyAllowMutability: true,
});

export const interviewModeAtom = atom<InterviewModeTypes>({
  key: "InterviewMode",
  default: "break",
});

export const interviewQuestionNumberAtom = atom<number>({
  key: "InterviewQuestionNumber",
  default: 0,
});

export const interviewQuestionTotalAtom = atom<number>({
  key: "InterviewQuestionTotal",
  default: 0,
});

/** 인터뷰 진행 중 채점 관련 */
export const answerScriptAtom = atom<string[]>({
  key: "AnswerScript",
  default: [],
});

export const irisScoreAtom = atom<number>({
  key: "IrisScore",
  default: IRIS_PERFECT_SCORE,
});

export const motionScoreAtom = atom<number>({
  key: "MotionScore",
  default: MOTION_PERFECT_SCORE,
});

export const motionSnapshotAtom = atom<FaceLandmarksDetection.Face>({
  key: "MotionSnapshot",
  default: {
    box: {
      height: 0,
      width: 0,
      xMax: 0,
      xMin: 0,
      yMax: 0,
      yMin: 0,
    },
    keypoints: [],
  },
});

export const feedbackAtom = atom<string>({
  key: "feedback",
  default: "ON",
});

/** 인터뷰 정보 */
export const InterviewDataAtom = atom<null | PostJoinRoomResponseData>({
  key: "userInterviewData",
  default: null,
});

/** 대체 면접관 */
export const aiInterviewerAtom = atom<AiInterviewerTypes>({
  key: "aiInterviewer",
  default: "Minho",
});

export const synthesizerAtom = atom<null | SpeechSynthesizer>({
  key: "Synthesizer",
  default: null,
  dangerouslyAllowMutability: true,
});

export const playerAtom = atom<null | SpeakerAudioDestination>({
  key: "Player",
  default: null,
  dangerouslyAllowMutability: true,
});
