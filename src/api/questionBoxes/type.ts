import { AxiosResponse } from "axios";
import { Member } from "types/apis";

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

export type DeleteQuestionBoxes = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<ResponseStatus>>;

export type QuestionBox = { // ! TODO: QuestionBoxes 또는 이 타입 둘 중 하나만 남기기
  idx: number;
  member: Member;
  boxName: string;
  questionNum: number;
};

export type QuestionDetail = {
  idx: number;
  questionBox: QuestionBox;
  questionTitle: string;
  keyword1: string;
  keyword2?: string;
  keyword3?: string;
  keyword4?: string;
  keyword5?: string;
};

export type GetQuestionDetailsResponse = ResponseStatus & {
  data: Array<QuestionDetail>;
};

export type GetQuestionDetails = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<GetQuestionDetailsResponse>>;
