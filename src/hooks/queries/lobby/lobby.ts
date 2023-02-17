import { useQuery } from "@tanstack/react-query";
import lobbyAPI from "api/lobby";

export const useGetInterviewRooms = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(["fetchInterviewRooms"], () => {
    return lobbyAPI.getInterviewRooms();
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
