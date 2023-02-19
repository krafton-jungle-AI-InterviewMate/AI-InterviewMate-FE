import { ImageQueryParams } from "api/example/types";
import { RoomTypes } from "api/mypage/types";

export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RATING_HISTORY: "/rating/history",
  GET_RATING_DETAIL: (roomIdx: number, type: RoomTypes) => `/rating/${roomIdx}?type=${type}`,
  POST_RATING_VIEWEE: (roomIdx: number) => `/rating/${roomIdx}/viewee`,
  POST_INTERVIEW_ROOMS: "/interview/rooms",
  GET_INTERVIEW_ROOMS: "/interview/rooms",
  GET_QUESTIONBOXES: (memberIdx: string) => `/questionBoxes/temp/${memberIdx}`,
};

export const AI_VIEWER_IDX = 79797979;
