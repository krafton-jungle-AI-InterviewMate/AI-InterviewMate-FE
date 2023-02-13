/** EXAMPLE CODE */

import { ImageQueryParams } from "api/example/types";
import { RatingHistory } from "api/mypage/types";

// export const BASE_URL = "https://api.thecatapi.com/v1"; // TODO: env
export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RESULT_LIST: (queryParams?: RatingHistory) => `/rating/history${queryParams || ""}`,
};
