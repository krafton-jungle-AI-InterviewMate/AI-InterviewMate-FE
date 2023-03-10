import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { getRecoil } from "recoil-nexus";
import { memberAtom } from "store/auth/atom";

import { Dict, CommonAPI } from "types/apis";
import { BASE_URL, AWS_API_GATEWAY_URL } from "constants/api";

const generateQueryEndPoint = (endPoint: string, data: Dict) => {
  const queryString = qs.stringify(data, {
    addQueryPrefix: true,
  });

  return `${endPoint}${queryString}`;
};

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const lambdaClient = axios.create({
  baseURL: `${AWS_API_GATEWAY_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request Success Handler - API 호출될 때마다 실행됨.
 */
const requestSuccessHandler = (config: AxiosRequestConfig) => {
  const { accessToken } = getRecoil(memberAtom);

  if (accessToken) {
    config.headers!["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
};

/**
 * Request Fail Handler
 */
const requestErrorHandler = err => {
  return Promise.reject(err);
};

/**
 * Response Fail handler
 */
const responseErrorHandler = err => {
  return Promise.reject(err);
};

/**
 * Axios Request Middleware
 */
axiosInstance.interceptors.request.use(
  config => requestSuccessHandler(config),
  err => requestErrorHandler(err),
);
lambdaClient.interceptors.request.use(
  config => requestSuccessHandler(config),
  err => requestErrorHandler(err),
);

/**
 * Axios Response Middleware
 */
axiosInstance.interceptors.response.use(
  response => response,
  err => responseErrorHandler(err),
);

export const getAPI: CommonAPI = ({ endPoint, data, axiosOption }) => {
  return axiosInstance.get(data ? generateQueryEndPoint(endPoint, data) : endPoint, axiosOption);
};

export const postAPI: CommonAPI = ({ endPoint, data, axiosOption }) => {
  return axiosInstance.post(endPoint, data, axiosOption);
};

export const putAPI: CommonAPI = ({ endPoint, data, axiosOption }) => {
  return axiosInstance.put(endPoint, data, axiosOption);
};

export const deleteAPI: CommonAPI = ({ endPoint, axiosOption }) => {
  return axiosInstance.delete(endPoint, axiosOption);
};

export const patchAPI: CommonAPI = ({ endPoint, data, axiosOption }) => {
  return axiosInstance.patch(endPoint, data, axiosOption);
};

export const lambdaGetAPI: CommonAPI = ({ endPoint, axiosOption }) => {
  return lambdaClient.get(endPoint, axiosOption);
};
