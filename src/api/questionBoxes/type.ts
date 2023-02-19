import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type questionBoxes = {
  idx: number;
  boxName: string;
  questionNum: number;
};

export type GetQuestionBoxesResponse = ResponseStatus & {
  data: Array<questionBoxes>;
};

export type GetQuestionBoxes = (
  memberIdx: string,
) => Promise<AxiosResponse<GetQuestionBoxesResponse>>;
