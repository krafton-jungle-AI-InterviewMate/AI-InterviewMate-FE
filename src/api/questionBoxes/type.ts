import { AxiosResponse } from "axios";
import { Member } from "types/apis";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type Questions = {
  questionIdx: number;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  keyword5: string;
  questionTitle: string;
};

export type QuestionBoxes = {
  questionBoxIdx: number;
  questionBoxName: string;
  questionNum: number;
  questions: Array<Questions>;
};

export type GetQuestionBoxesResponse = ResponseStatus & {
  data: Array<QuestionBoxes>;
};

export type GetQuestionBoxes = () => Promise<AxiosResponse<GetQuestionBoxesResponse>>;

export type DeleteQuestionBoxes = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<ResponseStatus>>;

export type Question = {
  questionIdx: number;
  keyword1: string | null;
  keyword2: string | null;
  keyword3: string | null;
  keyword4: string | null;
  keyword5: string | null;
  questionTitle: string;
};

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

export type DeleteQuestion = (questionIdx: number) => Promise<AxiosResponse<ResponseStatus>>;

export type CommonQuestionDetailsPayload = {
  keyword1: string;
  keyword2?: string;
  keyword3?: string;
  keyword4?: string;
  keyword5?: string;
  questionTitle: string;
};

export type PutQuestionDetailsPayload = CommonQuestionDetailsPayload & {
  questionIdx: number;
};

export type PutQuestionDetails = (
  payload: PutQuestionDetailsPayload,
) => Promise<AxiosResponse<ResponseStatus>>;

export type PostQuestionDetailsPayload = CommonQuestionDetailsPayload & {
  questionBoxIdx: number;
};

export type PostQuestionDetails = (
  payload: PostQuestionDetailsPayload,
) => Promise<AxiosResponse<ResponseStatus>>;

export type PutQuestionBoxNamePayload = {
  questionBoxIdx: number;
  questionBoxName: string;
};

export type PutQuestionBoxName = (
  payload: PutQuestionBoxNamePayload,
) => Promise<AxiosResponse<ResponseStatus>>;
