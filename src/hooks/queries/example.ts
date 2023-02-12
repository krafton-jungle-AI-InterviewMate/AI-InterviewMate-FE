/** EXAMPLE CODE */

import { useQuery } from "@tanstack/react-query";
import exampleAPI from "api/example";
import { ImageQueryParams } from "api/example/types";

type UseCatsParams = {
  imageQueryParams?: ImageQueryParams;
};

export const useCats = (params: UseCatsParams) => {
  const {
    imageQueryParams,
  } = params;

  const {
    data,
    isSuccess,
  } = useQuery([ "fetchCats" ], () => {
    return exampleAPI.getCats(imageQueryParams);
  });

  return {
    data,
    isSuccess,
  };
};
