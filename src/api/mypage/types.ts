import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
}

export type RoomTypes = "USER" | "AI";

export type RatingHistory = {
  roomName: string; // 방제목
  roomIdx: number;
  createdAt: string; // 생성 일자
  roomType: RoomTypes;
  roomTime: number; // 면접 시간
  roomQuestionNum: number; // 질문 개수
};

export type GetRatingHistoryResponse = ResponseStatus & {
  data: Array<RatingHistory>;
};

export type GetRatingHistory = () => Promise<AxiosResponse<GetRatingHistoryResponse>>;

export type Script = {
  questionTitle: string;
  script: string;
  rating: number;
}

export type RatingDetail = {
  eyesRating: number;
  attitudeRating: number;
  scriptList: Array<Script>;
  roomName: string;
  createdAt: string;
  roomQuestionNum: number;
};

export type GetRatingDetailResponse = ResponseStatus & {
  data: RatingDetail;
};

export type GetRatingDetail = (roomIdx: number, type: RoomTypes) => Promise<AxiosResponse<GetRatingDetailResponse>>;
