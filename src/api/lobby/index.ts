import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetInterviewRooms } from "./type";

const getInterviewRooms: GetInterviewRooms = () =>
  getAPI({ endPoint: API_PATH.GET_INTERVIEW_ROOMS });

export default {
  getInterviewRooms,
};
