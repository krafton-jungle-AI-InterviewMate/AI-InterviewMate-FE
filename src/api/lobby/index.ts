import { getAPI, postAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { PostInterviewRooms, GetInterviewRooms } from "api/lobby/type";

const getInterviewRooms: GetInterviewRooms = () =>
  getAPI({ endPoint: API_PATH.GET_INTERVIEW_ROOMS });

const postInterviewRooms: PostInterviewRooms = ({ data, roomIdx }) =>
  postAPI({
    endPoint: API_PATH.POST_INTERVIEW_ROOMS(roomIdx),
    data,
  });

export default {
  getInterviewRooms,
  postInterviewRooms,
};
