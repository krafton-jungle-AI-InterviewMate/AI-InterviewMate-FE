import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type RoomTypes = "USER" | "AI";

export type RoomStatus = "CREATE" | "PROCEED" | "EXIT";

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

export type InterviewRooms = {
  roomName: string;
  nickname: string;
  roomPeopleNum: number;
  roomPeopleNow: number;
  roomTime: number;
  roomIsPrivate: boolean;
  roomType: RoomTypes;
  roomStatus: RoomStatus;
  createdAt: string;
};

export type GetInterviewRoomsResponse = ResponseStatus & {
  data: Array<InterviewRooms>;
};

export type GetInterviewRooms = () => Promise<AxiosResponse<GetInterviewRoomsResponse>>;
