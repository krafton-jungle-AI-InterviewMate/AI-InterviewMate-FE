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

export type CommentsRequestDtos = {
  viewerIdx: number;
  questionTitle: string;
  comment: string;
};

export type ScriptRequestsDtos = {
  questionIdx: number;
  script: string;
};

export type PostRatingVieweePayloadData = {
  viewerIdx: number; // 79797979로 지정할 경우 AI로 인식된다고 함.
  eyesRating: number;
  attitudeRating: number;
  answerRating?: number;
  commentsRequestDtos?: Array<CommentsRequestDtos>;
  scriptRequestsDtos: Array<ScriptRequestsDtos>;
};

export type PostRatingVieweePayload = {
  data: PostRatingVieweePayloadData;
  roomIdx: number;
}

export type PostRatingVieweeResponse = {
  data: null;
  statusCode: number;
  statusMsg: string;
}

export type PostRatingViewee = (payload: PostRatingVieweePayload) => Promise<AxiosResponse<PostRatingVieweeResponse>>;
