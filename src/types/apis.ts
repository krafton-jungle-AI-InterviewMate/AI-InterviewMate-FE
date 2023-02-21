import { AxiosRequestConfig, AxiosResponse } from "axios";

export type Dict<T = unknown> = Record<string, T>;

export type AxiosParams = {
  endPoint: string;
  data?: Dict;
  axiosOption?: AxiosRequestConfig;
};

export type CommonAPI = (axiosParams: AxiosParams) => Promise<AxiosResponse>;

export type Member = {
  idx: number;
  nickname: string;
  email: string;
  authProvider: "GOOGLE"; // ! TODO: 1-auth merge 이후 수정
  refreshToken: string;
};
