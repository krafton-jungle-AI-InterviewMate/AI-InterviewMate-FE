import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetCats, GetRatingHistory, PostRatingViewee } from "./types";

const getCats: GetCats = params =>
  getAPI({
    endPoint: API_PATH.GET_IMAGE(params),
  });

const getRatingHistory: GetRatingHistory = () => getAPI({ endPoint: API_PATH.GET_RATING_HISTORY });

const postRatingViewee: PostRatingViewee = ({
  data,
  roomIdx,
}) => postAPI({
  endPoint: API_PATH.POST_RATING_VIEWEE(roomIdx),
  data,
});

export default {
  getCats,
  getRatingHistory,
  postRatingViewee,
};
