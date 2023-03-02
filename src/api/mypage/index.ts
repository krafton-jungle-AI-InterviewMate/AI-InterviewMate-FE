import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  GetRatingHistory,
  GetRatingDetail,
  PostRatingViewee,
  PostResultMemo,
} from "./types";

const getRatingHistory: GetRatingHistory = () => getAPI({ endPoint: API_PATH.GET_RESULT_HISTORY });

const getRatingDetail: GetRatingDetail = (roomIdx, type) => getAPI({
  endPoint: API_PATH.GET_RESULT_DETAIL(roomIdx, type),
});

const postRatingViewee: PostRatingViewee = ({
  data,
  roomIdx,
}) => postAPI({
  endPoint: API_PATH.POST_RESULT(roomIdx),
  data,
});

const postResultMemo: PostResultMemo = ({
  roomIdx,
  memo,
}) => postAPI({
  endPoint: API_PATH.POST_RESULT_MEMO(roomIdx),
  data: { memo },
});

export default {
  getRatingHistory,
  getRatingDetail,
  postRatingViewee,
  postResultMemo,
};
