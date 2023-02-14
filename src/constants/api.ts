/** EXAMPLE CODE */

import { ImageQueryParams } from "api/example/types";

// export const BASE_URL = "https://api.thecatapi.com/v1"; // TODO: env
export const BASE_URL = "https://jungle-weat.shop";

export const API_PATH = {
  GET_IMAGE: (queryParams?: ImageQueryParams) => `/images/search?${queryParams || ""}`,
  GET_RATING_HISTORY: "/rating/history",
  POST_RATING_VIEWEE: (roomIdx?: number) => `/rating/{roomIdx}/viewee${roomIdx ? `/${roomIdx}` : ""}`,
};
