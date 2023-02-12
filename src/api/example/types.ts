/** EXAMPLE CODE */

import { AxiosResponse } from "axios";

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
};

export type Cat = {
  id: string;
  url:string;
  width: number;
  height: number;
  breeds: any[];
  favourite: any;
};

export type GetCatsResponse = Array<Cat>;

export type GetCats = (params?: ImageQueryParams) => Promise<AxiosResponse<GetCatsResponse>>;
