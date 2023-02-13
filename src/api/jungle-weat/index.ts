import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetCats, GETResultList } from "./types";

const getCats: GetCats = params =>
  getAPI({
    endPoint: API_PATH.GET_IMAGE(params),
  });

const getResultList: GETResultList = params =>
  getAPI({ endPoint: API_PATH.GET_RESULT_LIST(params) });

export default {
  getCats,
  getResultList,
};
