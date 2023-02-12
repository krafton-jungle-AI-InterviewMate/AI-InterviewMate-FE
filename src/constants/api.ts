/** EXAMPLE CODE */

import { ImageQueryParams } from "types/apis";

export const BASE_URL = "https://api.thecatapi.com/v1"; // TODO: env

export const API_PATH = {
  GET_IMAGE: (queryParams: ImageQueryParams) =>
    `/images/search?${queryParams || ""}`,
};
