import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useDeleteQuestionBoxes = () => {
  return useMutation(questionBoxesAPI.deleteQuestionBoxes, {
    onSuccess: questionBoxIdx => {
      console.log(questionBoxIdx);
    },
    onError: e => {
      console.log(e);
    },
  });
};
