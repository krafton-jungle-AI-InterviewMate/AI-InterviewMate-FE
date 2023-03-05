import { useEffect } from "react";
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
      preferCurrentTab: true,
      audio: true,
    });
    
    stream_test = stream_test.getAudioTracks();
    let stream2 = new MediaStream();
    stream2.addTrack(stream_test[0]);

    let recorder = await new MultiStreamRecorder([stream, stream2], {
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
