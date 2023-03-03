import { useEffect } from "react";
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import RecordRTC, { MultiStreamRecorder } from "recordrtc";

export const useRecorderPermission = (
  recordingType: RecordRTC.Options["type"],
) => {
  const getPermissionInitializeRecorder = async () => {
    let stream = await (navigator as any).mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let stream_test = await (navigator as any).mediaDevices.getDisplayMedia({
      video: false,
      audio: true,
    });
    // let recorder = new RecordRTCPromisesHandler(stream, {
    //   type: recordingType,
    // });
    let recorder = new MultiStreamRecorder([stream, stream_test], {
      // type: recordingType,
      mimeType: 'video/webm'
    });

    return recorder;
  };

  useEffect(() => {
    getPermissionInitializeRecorder();
  }, []);

  return {
    getPermissionInitializeRecorder,
  };
};
