import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { faceLandmarksDetectorAtom } from "store/interview/atom";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawFaceMesh } from "lib/faceLandmarkDetection";

type UseVideoFaceMeshParams = {
  video: HTMLVideoElement | null;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  isDebugging: boolean;
  debuggingOption?: { isShowIndex?: boolean };
  /** 랜드마크를 단 한번만 detect할지 여부. 기본값은 false로, 랜드마크를 0.1초 간격으로 detect함. */
  isOneOff?: boolean;
};

const useFaceLandmarksDetection = (params: UseVideoFaceMeshParams) => {
  const {
    video,
    canvasRef,
    debuggingOption,
    isOneOff,
  } = params;
  let {
    isDebugging,
  } = params;

  if (import.meta.env.PROD) {
    isDebugging = false;
  }

  const [ detector, setDetector ] = useRecoilState(faceLandmarksDetectorAtom);

  const [ isVideoReady, setIsVideoReady ] = useState(false);
  const [ isDetectorLoading, setIsDetectorLoading ] = useState(false);
  const [ faceMeshErrorMsg, setFaceMeshErrorMsg ] = useState<null | string>(null);
  const [ face, setFace ] = useState<null | FaceLandmarksDetection.Face>(null);
  const [ isDetectionOn, setIsDetectionOn ] = useState(false);

  const setNewDetector = async () => {
    try {
      if (!isVideoReady) {
        throw new Error("video is not ready");
      }
      if (detector) {
        throw new Error("detector already exists");
      }

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
      if (!video) {
        return;
      }

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
      console.log(e);
      if (e instanceof Error) {
        setFaceMeshErrorMsg(e.message);
      }
    }
  };

  useEffect(() => {
    if (!video) {
      return;
    }

    const {
      readyState,
    } = video;

    if (readyState === 4) {
      setIsVideoReady(true);
    }
  }, [ video ]);

  useEffect(() => {
    if (!(isDetectionOn && detector)) {
      return;
    }

    if (isOneOff) {
      (async () => {
        await updateFace(detector);
      })();
    }
    else {
      const intervalId = window.setInterval(async () => {
        await updateFace(detector);
      }, 100);
  
      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [ isDetectionOn, detector ]);

  return {
    isVideoReady,
    isDetectorLoading,
    faceMeshErrorMsg,
    setNewDetector,
    face,
    setIsDetectionOn,
  };
};

export default useFaceLandmarksDetection;
