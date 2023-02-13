import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetRatingHistory, GetRatingDetail } from "./types";

const getRatingHistory: GetRatingHistory = () => getAPI({ endPoint: API_PATH.GET_RATING_HISTORY });

const getRatingDetail: GetRatingDetail = (roomIdx, type) => getAPI({
  endPoint: API_PATH.GET_RATING_DETAIL(roomIdx, type),
});

export default {
  getRatingHistory,
  getRatingDetail,
};
