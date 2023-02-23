import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type questionBoxes = {
  questionBoxIdx: number;
  questionBoxName: string;
  questionNum: number;
};

export type GetQuestionBoxesResponse = ResponseStatus & {
  data: Array<questionBoxes>;
};

export type GetQuestionBoxes = (
  memberIdx: string,
) => Promise<AxiosResponse<GetQuestionBoxesResponse>>;

export type DELETEQuestionBoxes = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<ResponseStatus>>;
