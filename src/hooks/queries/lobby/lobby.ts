import { useMutation, useQuery } from "@tanstack/react-query";
import lobbyAPI from "api/lobby";

export const useGetInterviewRooms = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useQuery(
    ["fetchInterviewRooms"],
    () => {
      return lobbyAPI.getInterviewRooms();
    },
    {
      refetchInterval: 10000,
    },
  );

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch,
  };
};

export const usePostInterviewRooms = () => {
  return useMutation(lobbyAPI.postInterviewRooms, {
    onSuccess: data => {
      console.log(data);
    },
    onError: e => {
      console.log(e);
    },
  });
};
