import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
}

export type PostInitiateVideoUploadPayload = {
  /**
   * ${roomIdx}+‘_’+${오늘날짜} 형식
   * 예) 72_230303.webm
   */
  fileName: string;
};

export type PostInitiateVideoUploadResponse = ResponseStatus & {
  uploadId: string;
  fileName: string;
};

export type PostInitiateVideoUpload = (payload: PostInitiateVideoUploadPayload) =>
  Promise<AxiosResponse<PostInitiateVideoUploadResponse>>;

export type PostSignedVideoUrlPayload = {
  fileName: string;
  uploadId: string;
  partNumber: number;
};

export type PostSignedVideoUrlResponse = ResponseStatus & {
  preSignedUrl: string;
};

export type PostSignedVideoUrl = (payload: PostSignedVideoUrlPayload) =>
  Promise<AxiosResponse<PostSignedVideoUrlResponse>>;

export type VideoPart = {
  partNumber: number;
  awsETag: string;
}

export type PostCompleteVideoUploadPayload = {
  parts: Array<VideoPart>;
  fileName: string;
  uploadId: string;
  roomIdx: number;
};

export type PostCompleteVideoUploadResponse = ResponseStatus & {
  name: string;
  url: string;
  size: number;
};

export type PostCompleteVideoUpload = (payload: PostCompleteVideoUploadPayload) =>
  Promise<AxiosResponse<PostCompleteVideoUploadResponse>>;

export type PostAbortVideoUploadPayload = {
  fileName: string;
  uploadId: string;
};

export type PostAbortVideoUpload = (payload: PostAbortVideoUploadPayload) =>
  Promise<AxiosResponse<ResponseStatus>>;
