import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type QuestionBoxes = {
  idx: number;
  boxName: string;
  questionNum: number;
};

export type GetQuestionBoxesResponse = ResponseStatus & {
  data: Array<QuestionBoxes>;
};

export type GetQuestionBoxes = (
  memberIdx: string,
) => Promise<AxiosResponse<GetQuestionBoxesResponse>>;
