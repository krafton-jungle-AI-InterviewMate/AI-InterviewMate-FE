import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetRatingHistory,GetRatingDetail, PostRatingViewee } from "./types";

const getRatingHistory: GetRatingHistory = () => getAPI({ endPoint: API_PATH.GET_RATING_HISTORY });

const getRatingDetail: GetRatingDetail = (roomIdx, type) => getAPI({
  endPoint: API_PATH.GET_RATING_DETAIL(roomIdx, type),
});

const postRatingViewee: PostRatingViewee = ({
  data,
  roomIdx,
}) => postAPI({
  endPoint: API_PATH.POST_RATING_VIEWEE(roomIdx),
  data,
});

export default {
  getRatingHistory,
  getRatingDetail,
  postRatingViewee,
};
