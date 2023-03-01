import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { faceLandmarksDetectorAtom } from "store/interview/atom";
import * as FaceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

type UseVideoFaceMeshParams = {
  video: HTMLVideoElement | null;
  /** 랜드마크를 단 한번만 detect할지 여부. 기본값은 false로, 랜드마크를 0.1초 간격으로 detect함. */
  isOneOff?: boolean;
};

const useFaceLandmarksDetection = (params: UseVideoFaceMeshParams) => {
  const {
    video,
    isOneOff,
  } = params;

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
        return;
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
      console.log(e);
      if (e instanceof Error) {
        setFaceMeshErrorMsg(e.message);
      }
    }
  };

  const updateFace = async (detector: FaceLandmarksDetection.FaceLandmarksDetector) => {
    try {
      if (!video) {
        throw new Error("video is not ready");
      }

      const { videoWidth, videoHeight } = video;

      video.width = videoWidth;
      video.height = videoHeight;

      const [ newFace ] = await detector.estimateFaces(video);
      setFace(newFace);

      return newFace;
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
      // updateFace를 사용처에서 직접 가져가서 처리헤야 함.
      // 깔끔하게 처리할 수 있는 더 좋은 방법이 있을텐데 ㅠ
      return;
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
    isDetectionOn,
    setIsDetectionOn,
    updateFace,
    detector,
  };
};

export default useFaceLandmarksDetection;
