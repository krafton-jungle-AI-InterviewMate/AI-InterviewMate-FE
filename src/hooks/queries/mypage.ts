import { useQuery, useMutation } from "@tanstack/react-query";
import mypageAPI from "api/mypage";
import { RoomTypes } from "api/mypage/types";

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

export const useGetRatingDetail = (roomIdx: number, type: RoomTypes) => {
  const { data, isSuccess, isLoading, isError, fetchStatus, isFetching, refetch } = useQuery(
    [ "fetchRatingDetail", `room${roomIdx}` ],
    () => {
      return mypageAPI.getRatingDetail(roomIdx, type);
    });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    fetchStatus,
    isFetching,
    refetch,
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

export const usePostResultMemo = () => {
  return useMutation(mypageAPI.postResultMemo);
};

export const usePostResultComment = () => {
  return useMutation(mypageAPI.postResultComment);
};
