import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isInterviewerAtom,
  recordModeAtom,
  userRecorderAtom,
} from "store/interview/atom";
import { MultiStreamRecorder } from "recordrtc";
import { Subscriber } from "openvidu-browser";

export const useUserRecorderPermission = (subscribers: Array<Subscriber>) => {
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const isRecordMode = useRecoilValue(recordModeAtom);
  const [ recorder, setRecorder ] = useRecoilState(userRecorderAtom);

  const getPermissionInitializeUserRecorder = async () => {
    // 저장할 음성 데이터 배열 생성
    const mediaStreams: MediaStream[] = [];
  
    // 모든 subscriber에서 오디오 트랙을 추출하여 배열에 추가
    subscribers.forEach(subscriber => {
      const { stream } = subscriber;
      const audioTrack = stream.getMediaStream().getAudioTracks()[0];
      const audioStream = new MediaStream([ audioTrack ]);

      mediaStreams.push(audioStream);
    });
    // 모든 오디오 트랙을 믹싱하여 새 MediaStream 객체 생성
    // 사용자 웹캠 및 마이크 데이터 불러오기 -> 원래 getPermissionInitializeUserRecorder에 있던 코드!!
    const userStream = await (navigator as any).mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // Recorder 할 객체 생성
    const rec = new MultiStreamRecorder([ userStream, ...mediaStreams ], {
      mimeType: "video/webm",
    });
    setRecorder(rec);
  
    // 영상 녹화
    rec.record();
  };

  useEffect(() => {
    if (isRecordMode && !isInterviewer) {
      (async () => {
        await getPermissionInitializeUserRecorder();
      })();
  
      return (() => {
        if (recorder) {
          recorder.clearRecordedData();
        }
      });
    }
  }, []);

  return {
    getPermissionInitializeUserRecorder,
  };
};
