import { atom } from "recoil";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import {
  InterviewModeTypes,
  AiInterviewerTypes,
  AiInterviewProcessTypes,
  TimelineRecord,
} from "types/interview";
import { PostInterviewRoomsResponse, PostInterviewRoomsResponseData } from "api/interview/type";
import { InitialTimelineRecord } from "constants/interview";

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

export const irisCountAtom = atom<number>({
  key: "IrisCount",
  default: 0,
});

export const motionCountAtom = atom<number>({
  key: "MotionCount",
  default: 0,
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
  key: "Feedback",
  default: "ON",
});

/** 인터뷰 정보 */
export const interviewDataAtom = atom<null | PostInterviewRoomsResponseData>({
  key: "UserInterviewData",
  default: null,
});

export const isInterviewerAtom = atom<boolean>({
  key: "IsInterviewer",
  default: false,
});

export const roomPeopleNowAtom = atom<number>({
  key: "RoomPeopleNow",
  default: 0,
});

export const isInterviewStartAtom = atom<boolean>({
  key: "IsInterviewStart",
  default: false,
});

export const interviewCommentAtom = atom<string>({
  key: "InterviewComment",
  default: "",
});

/** 대체 면접관 */
export const aiInterviewerAtom = atom<AiInterviewerTypes>({
  key: "AiInterviewer",
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

export const aiInterviewNextProcessAtom = atom<AiInterviewProcessTypes>({
  key: "AiInterviewNextProcess",
  default: "ready",
});

export const aiRoomResponseAtom = atom<null | PostInterviewRoomsResponse>({
  key: "AiRoomResponse",
  default: null,
});

export const recordModeAtom = atom<boolean>({
  key: "RecordMode",
  default: true,
});

export const timelineRecordAtom = atom<TimelineRecord>({
  key: "TimelineRecord",
  default: InitialTimelineRecord,
});

export const videoBlobAtom = atom<null | Blob>({
  key: "VideoBlob",
  default: null,
});

export const videoUrlAtom = atom<string>({
  key: "VideoUrl",
  default: "",
});
