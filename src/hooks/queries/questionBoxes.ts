import { useQuery } from "@tanstack/react-query";
import questionBoxesAPI from "api/questionBoxes";

export const useGetQuestionBoxes = (memberIdx: string) => {
  const { data, isSuccess, isLoading, isError } = useQuery(["fetchQuestionBoxes"], () => {
    return questionBoxesAPI.getQuestionBoxes(memberIdx);
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};

export const useDeleteQuestionBoxes = (questionBoxIdx: number) => {
  const { refetch, isSuccess, isLoading, isError } = useQuery(
    ["fetchDeleteQuestionBoxes"],
    () => {
      return questionBoxesAPI.deleteQuestionBoxes(questionBoxIdx);
    },
    {
      enabled: false,
    },
  );

  return {
    refetch,
    isSuccess,
    isLoading,
    isError,
  };
};
