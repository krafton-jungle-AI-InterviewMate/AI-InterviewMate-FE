import { useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler, MultiStreamRecorder } from "recordrtc";

export const useRecorderPermission = (
  recordingType: RecordRTC.Options["type"],
  isUserInterview?: boolean,
) => {
  const getPermissionInitializeRecorder = async () => {
    let stream = await (navigator as any).mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: recordingType,
    });

    return recorder;
  };

  const getPermissionInitializeUserRecorder = async () => {
    return; // 여기 함수 아무것도 안쓰는데, 아래 분기에 영향갈까봐 바로 리턴 시켜둘게요...
  };

  useEffect(() => {
    if (isUserInterview) {
      getPermissionInitializeUserRecorder();
    }
    else {
      getPermissionInitializeRecorder();
    }
  }, []);

  return {
    getPermissionInitializeRecorder,
    getPermissionInitializeUserRecorder,
  };
};
