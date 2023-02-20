import axios from "axios";
import qs from "qs";

import { Dict, CommonAPI } from "types/apis";
import { BASE_URL } from "constants/api";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

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
    // TODO: 인증 기능 구현 후 디폴트 헤더 추가
  },
});

/**
 * Request Success Handler
 */
const requestSuccessHandler = config => {
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
