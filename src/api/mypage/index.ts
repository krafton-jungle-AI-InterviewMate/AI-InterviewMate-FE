import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetRatingHistory } from "./types";

const getRatingHistory: GetRatingHistory = () => getAPI({ endPoint: API_PATH.GET_RATING_HISTORY });

export default {
  getRatingHistory,
};
