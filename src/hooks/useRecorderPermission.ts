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
    let stream1 = await (navigator as any).mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let screenStream = await (navigator as any).mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
      audio: true,
    });
    screenStream = screenStream.getAudioTracks();

    let stream2 = new MediaStream();
    stream2.addTrack(screenStream[0]);

    let recorder = new MultiStreamRecorder([ stream1, stream2 ], {
      mimeType: "video/webm",
    });

    return recorder;
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
