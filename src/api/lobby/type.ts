import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type RoomTypes = "USER" | "AI";

export type RoomStatus = "CREATE" | "PROCEED" | "EXIT";

export type PostInterviewRoomsPayloadData = {
  email?: string;
  roomName: string;
  roomPeopleNum?: number;
  roomPassword?: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionboxIdx: number;
  roomQuestionNum?: number;
  roomTime?: number;
};

export type PostInterviewRoomsPayload = {
  data: PostInterviewRoomsPayloadData;
  roomIdx: number;
};

export type PostInterviewRoomsResponse = PostInterviewRoomsPayloadData & {
  roomIdx: number;
  nickName: string;
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
  idx: number;
};

export type GetInterviewRoomsResponse = ResponseStatus & {
  data: Array<InterviewRooms>;
};

export type GetInterviewRooms = () => Promise<AxiosResponse<GetInterviewRoomsResponse>>;
