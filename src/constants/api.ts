import { ImageQueryParams } from "api/example/types";
import { RoomTypes } from "api/mypage/types";
import { GetAuthorizationParams } from "api/auth/type";

export const BASE_URL = "https://denia-wwdt.shop";
// export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RATING_HISTORY: "/rating/history",
  GET_RATING_DETAIL: (roomIdx: number, type: RoomTypes) => `/rating/${roomIdx}?type=${type}`,
  POST_RATING_VIEWEE: (roomIdx: number) => `/rating/${roomIdx}/viewee`,
  POST_INTERVIEW_ROOMS: "/interview/rooms",
  GET_INTERVIEW_ROOMS: "/interview/rooms",
  GET_QUESTIONBOXES: (memberIdx: string) => `/questionBoxes/temp/${memberIdx}`,
  DELETE_QUESTIONBOXES: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  PUT_QUESTIONBOX_NAME: questionBoxIdx => `/questionBoxes/${questionBoxIdx}`,
  GET_QUESTION_DETAILS: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`,
  PUT_QUESTION_DETAILS: (questionIdx: number) => `/questionBoxes/question/${questionIdx}`,
  POST_QUESTION_DETAILS: (questionBoxIdx: number) => `/questionBoxes/${questionBoxIdx}`, // !
  DELETE_QUESTION: (questionIdx: number) => `/questionBoxes/question/${questionIdx}`,
  GET_AUTHORIZATION: ({ social, redirect_uri }: GetAuthorizationParams) =>
    `/login/oauth2/authorization/${social}?redirect_uri=${window.location.origin}${redirect_uri}`,
  GET_REFRESH: "/login/refresh",
  GET_MYINFO: "/mypage/myinfo",
  POST_JOIN_ROOM: (roomIdx: number) => `/interview/rooms/${roomIdx}`,
};

export const AI_VIEWER_IDX = 79797979;
