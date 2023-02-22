import { AxiosResponse } from "axios";
import { Member } from "types/apis";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type QuestionBoxes = {
  questionBoxIdx: number;
  questionBoxName: string;
  questionNum: number;
};

export type GetQuestionBoxesResponse = ResponseStatus & {
  data: Array<QuestionBoxes>;
};

export type GetQuestionBoxes = (
  memberIdx: string,
) => Promise<AxiosResponse<GetQuestionBoxesResponse>>;

export type DeleteQuestionBoxes = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<ResponseStatus>>;

export type Question = {
  keyword1: string;
  keyword2?: string;
  keyword3?: string;
  keyword4?: string;
  keyword5?: string;
  questionTitle: string
}

export type QuestionDetail = {
  questionBoxIdx: number;
  questionBoxName: string;
  questionNum: number;
  questions: Array<Question>;
};

export type GetQuestionDetailsResponse = ResponseStatus & {
  data: QuestionDetail;
};

export type GetQuestionDetails = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<GetQuestionDetailsResponse>>;

export type DeleteQuestion = (
  questionIdx: number,
) => Promise<AxiosResponse<ResponseStatus>>;
