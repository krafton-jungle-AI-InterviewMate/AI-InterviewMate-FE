import { useQuery } from "@tanstack/react-query";
import questionBoxesAPI from "api/questionBoxes";

export const useGetQuestionBoxes = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(["fetchQuestionBoxes"], () => {
    return questionBoxesAPI.getQuestionBoxes();
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};
