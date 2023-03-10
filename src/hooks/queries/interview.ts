import { useMutation, useQuery } from "@tanstack/react-query";
import interviewAPI from "api/interview";
import { useNavigate } from "react-router-dom";

export const useDeleteInterviewRooms = () => {
  return useMutation(interviewAPI.deleteInterviewRooms);
};

export const useDeleteInterviewRoomsOnInterviewee = (onSuccess: any) => {
  const navigate = useNavigate();
  return useMutation(interviewAPI.deleteInterviewRooms, {
    onSuccess,
  });
};

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
    onSuccess: () => {
      console.log("면접방 상태 변경");
    },
    onError: e => {
      console.log(e);
    },
  });
};

export const useGetQuestionDetails = (questionBoxIdx: number) => {
  const { data, isLoading, isSuccess, isError } = useQuery(["userInterviewQuestionDetails"], () => {
    return interviewAPI.getQuestionDetails(questionBoxIdx);
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
};
