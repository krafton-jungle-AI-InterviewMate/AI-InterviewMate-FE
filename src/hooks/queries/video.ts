import { useMutation } from "@tanstack/react-query";
import videoAPI from "api/video";

import { useSetRecoilState } from "recoil";
import { preSignedUrlListAtom } from "store/interview/atom";

export const usePostInitiateVideoUpload = () => {
  return useMutation(videoAPI.postInitiateVideoUpload);
};

export const usePostSignedVideoUrl = () => {
  const setPreSignedUrlListAtom = useSetRecoilState(preSignedUrlListAtom);

  return useMutation(
    videoAPI.postSignedVideoUrl,
    {
      onSuccess: ({ data: { preSignedUrl }}) => {
        setPreSignedUrlListAtom((curr) => ([ ...curr, preSignedUrl ]));
      },
    },
  );
};

export const usePostCompleteVideoUpload = () => {
  return useMutation(videoAPI.postCompleteVideoUpload);
};

export const usePostAbortVideoUpload = () => {
  return useMutation(videoAPI.postAbortVideoUpload);
};
