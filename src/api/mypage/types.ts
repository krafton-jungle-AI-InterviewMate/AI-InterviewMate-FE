/** EXAMPLE CODE */

import { AxiosResponse } from "axios";

/**
 * https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
 */
export type ImageOrder = "ASC" | "DESC" | "RAND";

export type ImageQueryParams = {
  /** Number of images to return (Up to 100) */
  limit: number;
  /** The page number to use when Paginating through the images */
  page: number;
  /** The Order to return the images in by their upload date. */
  order: ImageOrder;
  /** Only return images that have breed information */
  has_breeds: 1 | 0;
};

export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
  favourite: any;
};

export type RatingHistory = {
  roomName: string; // 방제목
  roomIdx: number;
  createdAt: string; // 생성 일자
  roomType: "USER" | "AI";
  roomTime: number; // 면접 시간
  roomQuestionNum: number; // 질문 개수
};

export type GetCatsResponse = Array<Cat>;

export type GetCats = (params?: ImageQueryParams) => Promise<AxiosResponse<GetCatsResponse>>;

export type GetRatingHistoryResponse = {
  statusCode: number;
  statusMsg: string;
  data: Array<RatingHistory>;
};

export type GetRatingHistory = () => Promise<AxiosResponse<GetRatingHistoryResponse>>;

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
