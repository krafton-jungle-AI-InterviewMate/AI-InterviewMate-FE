import { useMutation, useQuery } from "@tanstack/react-query";
import interviewAPI from "api/interview";

export const useGetInterviewRooms = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useQuery(
    ["fetchInterviewRooms"],
    () => {
      return interviewAPI.getInterviewRooms();
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
  return useMutation(interviewAPI.postInterviewRooms, {
    onSuccess: data => {
      console.log(data);
    },
    onError: e => {
      console.log(e);
    },
  });
};

export const usePostJoinRoom = () => {
  return useMutation(interviewAPI.postJoinRoom, {
    onSuccess: data => {
      console.log(data);
    },
    onError: e => {
      console.log(e);
    },
  });
};

export const usePutInterviewRooms = () => {
  return useMutation(interviewAPI.putInterviewRooms, {
    onSuccess: roomIdx => {
      console.log(roomIdx);
    },
    onError: e => {
      console.log(e);
    },
  });
};
