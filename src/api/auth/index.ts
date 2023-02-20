import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetAuthorization, GetAuthorizationParams } from "./type";

const getAuthorization: GetAuthorization = (params: GetAuthorizationParams) =>
  getAPI({ endPoint: API_PATH.GET_AUTHORIZATION(params) });

export default {
  getAuthorization,
};
