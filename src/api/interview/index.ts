import { getAPI, postAPI, putAPI, deleteAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  PostInterviewRooms,
  GetInterviewRooms,
  PostJoinRoom,
  PutInterviewRooms,
  GetQuestionDetails,
  DeleteInterviewRooms,
} from "api/interview/type";

const deleteInterviewRooms: DeleteInterviewRooms = (roomIdx) => deleteAPI({
  endPoint: API_PATH.DELETE_INTERVIEW_ROOMS(roomIdx),
});

const getInterviewRooms: GetInterviewRooms = () =>
  getAPI({ endPoint: API_PATH.GET_INTERVIEW_ROOMS });

const postInterviewRooms: PostInterviewRooms = ({ data }) =>
  postAPI({
    endPoint: API_PATH.POST_INTERVIEW_ROOMS,
    data,
  });

const postJoinRoom: PostJoinRoom = ({ roomIdx, password }) =>
  postAPI({
    endPoint: API_PATH.POST_JOIN_ROOM(roomIdx),
    data: { password },
  });

const putInterviewRooms: PutInterviewRooms = roomIdx =>
  putAPI({
    endPoint: API_PATH.PUT_INTERVIEW_ROOMS(roomIdx),
  });

const getQuestionDetails: GetQuestionDetails = questionBoxIdx =>
  getAPI({
    endPoint: API_PATH.POST_QUESTION_DETAILS(questionBoxIdx),
  });

export default {
  deleteInterviewRooms,
  getInterviewRooms,
  postInterviewRooms,
  postJoinRoom,
  putInterviewRooms,
  getQuestionDetails,
};
