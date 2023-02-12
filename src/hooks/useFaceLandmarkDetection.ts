import { useEffect, useState } from "react";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawFaceMesh } from "lib/faceLandmarkDetection";

type UseVideoFaceMeshParams = {
  video: HTMLVideoElement;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  isDebugging: boolean;
  debuggingOption?: { isShowIndex?: boolean };
};

const useFaceLandmarksDetection = (params: UseVideoFaceMeshParams) => {
  const {
    video,
    video: {
      readyState,
    },
    canvasRef,
    debuggingOption,
  } = params;
  let {
    isDebugging,
  } = params;

  if (import.meta.env.PROD) {
    isDebugging = false;
  }

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

      // * 이하 디버깅을 위한 캔버스 관련 처리
      if (isDebugging) {
        if (!canvasRef.current) {
          throw new Error("no canvasRef.current");
        }

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const ctx = canvasRef.current.getContext("2d");

        if (!ctx) {
          throw new Error("ctx not ready");
        }

        const isShowIndex = Boolean(debuggingOption && debuggingOption.isShowIndex);

        drawFaceMesh({
          keypoints: newFace.keypoints,
          ctx,
          isShowIndex,
        });
      }
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
