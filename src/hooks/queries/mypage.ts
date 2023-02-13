import { useQuery } from "@tanstack/react-query";
import mypageAPI from "api/mypage";

export const useGetRatingHistory = () => {
  const {
    data,
    isSuccess,
    isLoading,
    isError,
  } = useQuery([ "fetchCats" ], () => {
    return mypageAPI.getRatingHistory();
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
