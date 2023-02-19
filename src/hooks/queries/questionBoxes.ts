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
