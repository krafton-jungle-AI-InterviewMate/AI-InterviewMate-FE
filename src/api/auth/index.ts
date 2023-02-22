import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  GetAuthorization,
  GetAuthorizationParams,
  GetRefresh,
  GetMyinfo,
} from "./type";

const getAuthorization: GetAuthorization = (params: GetAuthorizationParams) =>
  getAPI({ endPoint: API_PATH.GET_AUTHORIZATION(params) });

const getRefresh: GetRefresh = () => getAPI({ endPoint: API_PATH.GET_REFRESH });

const getMyinfo: GetMyinfo = () => getAPI({ endPoint: API_PATH.GET_MYINFO });

export default {
  getAuthorization,
  getRefresh,
  getMyinfo,
};
