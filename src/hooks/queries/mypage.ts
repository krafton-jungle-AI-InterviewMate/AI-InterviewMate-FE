import { useQuery, useMutation } from "@tanstack/react-query";
import mypageAPI from "api/mypage";

export const useGetRatingHistory = () => {
  const { data, isSuccess, isLoading, isError } = useQuery([ "fetchRatingHistory" ], () => {
    return mypageAPI.getRatingHistory();
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};

export const usePostRatingViewee = () => {
  return useMutation(mypageAPI.postRatingViewee, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
