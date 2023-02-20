import { useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

export const useRecorderPermission = (
  recordingType: RecordRTC.Options["type"],
) => {
  useEffect(() => {
    getPermissionInitializeRecorder();
  }, []);

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

  return {
    getPermissionInitializeRecorder,
  };
};
