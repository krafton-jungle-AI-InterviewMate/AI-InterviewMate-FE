import { AxiosRequestConfig, AxiosResponse } from "axios";

export type Dict<T = unknown> = Record<string, T>;

export type AxiosParams = {
  endPoint: string;
  data?: Dict;
  axiosOption?: AxiosRequestConfig;
};

export type CommonAPI = (axiosParams: AxiosParams) => Promise<AxiosResponse>;
