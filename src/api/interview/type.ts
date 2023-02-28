import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type RoomTypes = "USER" | "AI";

export type RoomStatus = "CREATE" | "PROCEED" | "EXIT";

export type PostInterviewRoomsPayloadData = {
  roomName: string;
  roomPeopleNum?: number;
  roomPassword?: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionBoxIdx: number;
  roomQuestionNum?: number;
  roomTime?: number;
};

export type PostInterviewRoomsPayload = {
  data: PostInterviewRoomsPayloadData;
};

export type PostInterviewRoomsResponse = ResponseStatus & {
  data: PostInterviewRoomsPayloadData & {
    roomIdx: number;
    nickname: string;
    createdAt: string;
    roomStatus: RoomStatus;
    connectionToken: string;
    questionList: Array<string>;
  };
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

export type PostJoinRoomResponseData = PostInterviewRoomsPayloadData & {
  roomIdx: number;
  nickname: string;
  createdAt: string;
  roomStatus: RoomStatus;
  connectionToken: string;
  questionList: Array<string>;
  roomViewer1Idx?: number;
  roomViewer2Idx?: number;
  roomViewer3Idx?: number;
};

export type PostJoinRoomResponse = ResponseStatus & {
  data: PostJoinRoomResponseData;
};

export type PostJoinRoom = (roomIdx: number) => Promise<AxiosResponse<PostJoinRoomResponse>>;
