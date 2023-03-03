import { postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  PostInitiateVideoUpload,
  PostSignedVideoUrl,
  PostCompleteVideoUpload,
  PostAbortVideoUpload,
} from "./types";

const postInitiateVideoUpload: PostInitiateVideoUpload = ({
  fileName,
}) => postAPI({
  endPoint: API_PATH.POST_INITIATE_VIDEO_UPLOAD,
  data: { fileName },
});

const postSignedVideoUrl: PostSignedVideoUrl = (data) => postAPI({
  endPoint: API_PATH.POST_SIGNED_VIDEO_URL,
  data,
});

const postCompleteVideoUpload: PostCompleteVideoUpload = (data) => postAPI({
  endPoint: API_PATH.POST_COMPLETE_VIDEO_UPLOAD,
  data,
});

const postAbortVideoUpload: PostAbortVideoUpload = (data) => postAPI({
  endPoint: API_PATH.POST_ABORT_VIDEO_UPLOAD,
  data,
});

export default {
  postInitiateVideoUpload,
  postSignedVideoUrl,
  postCompleteVideoUpload,
  postAbortVideoUpload,
};
