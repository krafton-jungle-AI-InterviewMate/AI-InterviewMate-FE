import { getAPI, postAPI, putAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  PostInterviewRooms,
  GetInterviewRooms,
  PostJoinRoom,
  PutInterviewRooms,
} from "api/interview/type";

const getInterviewRooms: GetInterviewRooms = () =>
  getAPI({ endPoint: API_PATH.GET_INTERVIEW_ROOMS });

const postInterviewRooms: PostInterviewRooms = ({ data }) =>
  postAPI({
    endPoint: API_PATH.POST_INTERVIEW_ROOMS,
    data,
  });

const postJoinRoom: PostJoinRoom = roomIdx =>
  postAPI({
    endPoint: API_PATH.POST_JOIN_ROOM(roomIdx),
  });

const putInterviewRooms: PutInterviewRooms = roomIdx =>
  putAPI({
    endPoint: API_PATH.PUT_INTERVIEW_ROOMS(roomIdx),
  });

export default {
  getInterviewRooms,
  postInterviewRooms,
  postJoinRoom,
  putInterviewRooms,
};
