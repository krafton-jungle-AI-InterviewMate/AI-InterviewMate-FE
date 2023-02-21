import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetAuthorization, GetAuthorizationParams, GetRefresh } from "./type";

const getAuthorization: GetAuthorization = (params: GetAuthorizationParams) =>
  getAPI({ endPoint: API_PATH.GET_AUTHORIZATION(params) });

const getRefresh: GetRefresh = () => getAPI({ endPoint: API_PATH.GET_REFRESH });

export default {
  getAuthorization,
  getRefresh,
};
