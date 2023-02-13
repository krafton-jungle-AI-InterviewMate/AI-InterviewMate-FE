import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetCats, GetRatingHistory } from "./types";

const getCats: GetCats = params =>
  getAPI({
    endPoint: API_PATH.GET_IMAGE(params),
  });

const getRatingHistory: GetRatingHistory = () =>
  getAPI({ endPoint: API_PATH.GET_RESULT_LIST() });

export default {
  getCats,
  getRatingHistory,
};
