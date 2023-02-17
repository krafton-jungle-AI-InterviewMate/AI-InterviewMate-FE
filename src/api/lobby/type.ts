import { AxiosResponse } from "axios";

export type PostInterviewRoomsPayload = {
  email?: string;
  roomName: string;
  roomPeopleNum: number;
  roomPassword?: string;
  isPrivate: boolean;
  roomType: "USER" | "AI";
  roomQuestionboxIdx: number;
  roomQuestionNum?: number;
  roomTime: number;
};

export type PostInterviewRoomsResponse = {
  roomIdx: number;
  roomName: string;
  roomPeopleNum: number;
  roomPassword?: number;
  roomType: "USER" | "AI";
  nickName: string;
  roomTime: number;
  roomQuestionNum: number;
  roomQuestionboxIdx: number;
  createdAt: string;
  roomStatus: string;
};

export type PostInterviewRooms = (
  payload: PostInterviewRoomsPayload,
) => Promise<AxiosResponse<PostInterviewRoomsResponse>>;
