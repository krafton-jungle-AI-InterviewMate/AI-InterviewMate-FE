import { AxiosResponse } from "axios";

type ResponseStatus = {
  statusCode: number;
  statusMsg: string;
};

export type RoomTypes = "USER" | "AI";

export type RoomStatus = "CREATE" | "PROCEED" | "EXIT";

export type DeleteInterviewRoomsResponse = ResponseStatus;

export type DeleteInterviewRooms = (
  roomIdx: number,
) => Promise<AxiosResponse<DeleteInterviewRoomsResponse>>;

export type PostInterviewRoomsPayloadData = {
  roomName: string;
  roomPeopleNum?: number;
  roomPassword?: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionBoxIdx: number;
  roomQuestionNum?: number;
  roomTime?: any;
};

export type PostInterviewRoomsPayload = {
  data: PostInterviewRoomsPayloadData;
};

export type QuestionListItem = {
  questionIdx: number;
  keyword1: string;
  keyword2: string | null;
  keyword3: string | null;
  keyword4: string | null;
  keyword5: string | null;
  questionTitle: string;
};

export type PostInterviewRoomsResponseData = PostInterviewRoomsPayloadData & {
  roomIdx: number;
  nickname: string;
  createdAt: string;
  roomStatus: RoomStatus;
  connectionToken: string;
  questionList: Array<QuestionListItem>;
};

export type PostInterviewRoomsResponse = ResponseStatus & {
  data: PostInterviewRoomsResponseData;
};

export type PostInterviewRooms = (
  payload: PostInterviewRoomsPayload,
) => Promise<AxiosResponse<PostInterviewRoomsResponse>>;

export type InterviewRooms = {
  idx: number;
  roomName: string;
  nickname: string;
  roomPeopleNum: number;
  roomTime: number;
  roomIsPrivate: boolean;
  roomType: RoomTypes;
  roomStatus: RoomStatus;
  createdAt: string;
  interviewerIdxes: Array<string>;
};

export type GetInterviewRoomsResponse = ResponseStatus & {
  data: Array<InterviewRooms>;
};

export type GetInterviewRooms = () => Promise<AxiosResponse<GetInterviewRoomsResponse>>;

export type PostJoinRoomPayload = {
  roomIdx: number;
  password: string | null;
};

export type PostJoinRoomResponseData = PostInterviewRoomsPayloadData & {
  roomIdx: number;
  nickname: string;
  createdAt: string;
  roomStatus: RoomStatus;
  connectionToken: string;
  questionList: Array<QuestionListItem>;
  roomViewer1Idx?: number;
  roomViewer2Idx?: number;
  roomViewer3Idx?: number;
  interviewerIdxes: Array<string>;
};

export type PostJoinRoomResponse = ResponseStatus & {
  data: PostJoinRoomResponseData;
};

export type PostJoinRoom = (
  payload: PostJoinRoomPayload,
) => Promise<AxiosResponse<PostJoinRoomResponse>>;

export type PutInterviewRooms = (roomIdx: number) => Promise<AxiosResponse<ResponseStatus>>;

export type GetQuestionDetailsResponseData = {
  questionBoxIdx: number;
  questionBoxName: string;
  questionNum: number;
  questions: [
    {
      questionIdx: number;
      keyword1: string;
      keyword2: string;
      keyword3: string;
      keyword4: string;
      keyword5: string;
      questionTitle: string;
    },
  ];
};

export type GetQuestionDetailsResponse = ResponseStatus & {
  data: GetQuestionDetailsResponseData;
};

export type GetQuestionDetails = (
  questionBoxIdx: number,
) => Promise<AxiosResponse<GetQuestionDetailsResponse>>;
