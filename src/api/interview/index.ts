import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { PostInterviewRooms, GetInterviewRooms, PostJoinRoom } from "api/interview/type";

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

export default {
  getInterviewRooms,
  postInterviewRooms,
  postJoinRoom,
};
