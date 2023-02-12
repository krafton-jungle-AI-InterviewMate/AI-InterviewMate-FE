import { AxiosRequestConfig, AxiosResponse } from "axios";

export type Dict<T = unknown> = Record<string, T>;

export type AxiosParams = {
  endPoint: string;
  data?: Dict;
  axiosOption?: AxiosRequestConfig;
};

export type CommonAPI = (axiosParams: AxiosParams) => Promise<AxiosResponse>;

/** EXAMPLE CODE */

/**
 * https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
 */
export type ImageOrder = "ASC" | "DESC" | "RAND";

export type ImageQueryParams = {
  /** Number of images to return (Up to 100) */
  limit: number;
  /** The page number to use when Paginating through the images */
  page: number;
  /** The Order to return the images in by their upload date. */
  order: ImageOrder;
  /** Only return images that have breed information */
  has_breeds: 1 | 0;
} | null;
