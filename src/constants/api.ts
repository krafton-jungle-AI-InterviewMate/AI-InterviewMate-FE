import { ImageQueryParams } from "api/example/types";
import { RoomTypes } from "api/mypage/types";

export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RATING_HISTORY: "/rating/history",
  GET_RATING_DETAIL: (roomIdx: number, type: RoomTypes) => `/rating/${roomIdx}?type=${type}`,
};
