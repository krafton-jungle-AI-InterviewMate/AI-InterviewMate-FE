import { useEffect, useState } from "react";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

type UseVideoFaceMeshParams = {
  video: HTMLVideoElement;
};

const useFaceLandmarksDetection = (params: UseVideoFaceMeshParams) => {
  const {
    video,
    video: {
      readyState,
    },
  } = params;

  const [ isVideoReady, setIsVideoReady ] = useState(false);
  const [ isDetectorLoading, setIsDetectorLoading ] = useState(false);
  const [ faceMeshErrorMsg, setFaceMeshErrorMsg ] = useState<null | string>(null);
  const [ detector, setDetector ] = useState<null | FaceLandmarksDetection.FaceLandmarksDetector>(
    null,
  );
  const [ face, setFace ] = useState<null | FaceLandmarksDetection.Face>(null);

  const setNewDetector = async () => {
    try {
      setIsDetectorLoading(true);

      const model = FaceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig: FaceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
        runtime: "mediapipe",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
        refineLandmarks: true,
      };

      const newDetector = await FaceLandmarksDetection.createDetector(model, detectorConfig);
      setDetector(newDetector);
      setIsDetectorLoading(false);
    }
    catch (e) {
      if (e instanceof Error) {
        setFaceMeshErrorMsg(e.message);
      }
    }
  };

  const updateFace = async (detector: FaceLandmarksDetection.FaceLandmarksDetector) => {
    try {
      const { videoWidth, videoHeight } = video;

      video.width = videoWidth;
      video.height = videoHeight;

      const [ newFace ] = await detector.estimateFaces(video);
      setFace(newFace);
    }
    catch (e) {
      if (e instanceof Error) {
        setFaceMeshErrorMsg(e.message);
      }
    }
  };

  useEffect(() => {
    if (readyState === 4) {
      setIsVideoReady(true);
    }
  }, [ readyState ]);

  useEffect(() => {
    if (isVideoReady) {
      (async () => {
        await setNewDetector();
      })();
    }
  }, [ isVideoReady ]);

  useEffect(() => {
    if (detector) {
      const intervalId = window.setInterval(async () => {
        await updateFace(detector);
      }, 100);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [ detector ]);

  return {
    isDetectorLoading,
    faceMeshErrorMsg,
    face,
  };
};

export default useFaceLandmarksDetection;
