import { deleteAPI, getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { DELETEQuestionBoxes, GetQuestionBoxes } from "./type";

const getQuestionBoxes: GetQuestionBoxes = memberIdx =>
  getAPI({ endPoint: API_PATH.GET_QUESTIONBOXES(memberIdx) });

const deleteQuestionBoxes: DELETEQuestionBoxes = questionBoxIdx =>
  deleteAPI({ endPoint: API_PATH.DELETE_QUESTIONBOXES(questionBoxIdx) });

export default {
  getQuestionBoxes,
  deleteQuestionBoxes,
};
