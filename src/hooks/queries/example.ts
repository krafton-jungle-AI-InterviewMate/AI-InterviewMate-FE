/** EXAMPLE CODE */

import { useQuery } from "@tanstack/react-query";
import { getAPI } from "api/axios";

const fetchCats = () =>
  getAPI({
    endPoint: "/images/search",
  });

export const useFetchCats = () => {
  return useQuery([ "fetchCats" ], () => fetchCats());
};
