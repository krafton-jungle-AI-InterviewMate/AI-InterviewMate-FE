import { ImageQueryParams } from "api/example/types";
import { RoomTypes } from "api/mypage/types";
import { GetAuthorizationParams } from "api/auth/type";

export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RESULT_HISTORY: "/result/history",
  GET_RESULT_DETAIL: (roomIdx: number, type: RoomTypes) => `/result/${roomIdx}?type=${type}`,
  POST_RESULT: (roomIdx: number) => `/result/${roomIdx}`,
  POST_RESULT_MEMO: (roomIdx: number) => `/result/${roomIdx}/memo`,
  POST_RESULT_COMMENT: (roomIdx: number) => `/result/${roomIdx}/comment`,
  POST_INTERVIEW_ROOMS: "/interview/rooms",
  GET_INTERVIEW_ROOMS: "/interview/rooms",
  DELETE_INTERVIEW_ROOMS: (roomIdx: number) => `/interview/rooms/${roomIdx}`,
  GET_QUESTIONBOXES: "/questionBoxes",
  DELETE_QUESTIONBOXES: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  PUT_QUESTIONBOX_NAME: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  GET_QUESTION_DETAILS: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  PUT_QUESTION_DETAILS: (questionIdx: number) => `/questionBoxes/question/${questionIdx}`,
  POST_QUESTION_DETAILS: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  DELETE_QUESTION: (questionIdx: number) => `/questionBoxes/question/${questionIdx}`,
  GET_AUTHORIZATION: ({ social, redirect_uri }: GetAuthorizationParams) =>
    `/login/oauth2/authorization/${social}?redirect_uri=${window.location.origin}${redirect_uri}`,
  GET_REFRESH: "/login/refresh",
  GET_MYINFO: "/mypage/myinfo",
  PUT_NICKNAME: "/mypage/nickname",
  POST_JOIN_ROOM: (roomIdx: number) => `/interview/rooms/${roomIdx}`,
  PUT_INTERVIEW_ROOMS: (roomIdx: number) => `/interview/rooms/${roomIdx}`,
  POST_INITIATE_VIDEO_UPLOAD: "/video/initiate-upload",
  POST_SIGNED_VIDEO_URL: "/video/upload-signed-url",
  POST_COMPLETE_VIDEO_UPLOAD: "/video/complete-upload",
  POST_ABORT_VIDEO_UPLOAD: "/video/abort-upload",
};

export const AI_VIEWER_IDX = 79797979;
export const AWS_API_GATEWAY_URL = "https://jqyikrv9ta.execute-api.ap-northeast-2.amazonaws.com";

export const AWS_API_PATH = {
  GET_AZURE_TOKEN: "/v1/azure-token",
};
