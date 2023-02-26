import { getAPI, lambdaGetAPI, putAPI } from "api/axios";
import { API_PATH, AWS_API_PATH } from "constants/api";
import {
  GetAuthorization,
  GetAuthorizationParams,
  GetRefresh,
  GetMyinfo,
  GetAzureToken,
  PutNickname,
} from "./type";

const getAuthorization: GetAuthorization = (params: GetAuthorizationParams) =>
  getAPI({ endPoint: API_PATH.GET_AUTHORIZATION(params) });

const getRefresh: GetRefresh = () => getAPI({ endPoint: API_PATH.GET_REFRESH });

const getMyinfo: GetMyinfo = () => getAPI({ endPoint: API_PATH.GET_MYINFO });

const getAzureToken: GetAzureToken = () => lambdaGetAPI({ endPoint: AWS_API_PATH.GET_AZURE_TOKEN });

const putNickname: PutNickname = (data) => putAPI({
  endPoint: API_PATH.PUT_NICKNAME,
  data,
});

export default {
  getAuthorization,
  getRefresh,
  getMyinfo,
  getAzureToken,
  putNickname,
};
