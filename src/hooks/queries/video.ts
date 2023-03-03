import { useMutation } from "@tanstack/react-query";
import videoAPI from "api/video";

export const usePostInitiateVideoUpload = () => {
  return useMutation(videoAPI.postInitiateVideoUpload);
};

export const usePostSignedVideoUrl = () => {
  return useMutation(videoAPI.postSignedVideoUrl);
};

export const usePostCompleteVideoUpload = () => {
  return useMutation(videoAPI.postCompleteVideoUpload);
};

export const usePostAbortVideoUpload = () => {
  return useMutation(videoAPI.postAbortVideoUpload);
};
