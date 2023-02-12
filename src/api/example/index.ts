import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetCats } from "./types";

const getCats: GetCats = (params) => getAPI({
  endPoint: API_PATH.GET_IMAGE(params),
});

export default {
  getCats,
};
