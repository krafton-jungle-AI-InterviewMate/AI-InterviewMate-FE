import { useMutation, useQuery } from "@tanstack/react-query";
import questionBoxesAPI from "api/questionBoxes";

export const useGetQuestionBoxes = (memberIdx: string) => {
  const { data, isSuccess, isLoading, isError } = useQuery([ "fetchQuestionBoxes" ], () => {
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

export const useQuestionDetails = (questionBoxIdx: number) => {
  const { data, refetch, isSuccess, isLoading, isFetching, isError } = useQuery(
    [ "fetchQuestionDetails", `box${questionBoxIdx}` ],
    () => {
      return questionBoxesAPI.getQuestionDetails(questionBoxIdx);
    });

  return {
    data,
    refetch,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  };
};

export const useDeleteQuestion = () => {
  return useMutation(questionBoxesAPI.deleteQuestion);
};

export const usePutQuestionDetails = () => {
  return useMutation(questionBoxesAPI.putQuestionDetails);
};
