import { deleteAPI, getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { DeleteQuestionBoxes, GetQuestionBoxes, GetQuestionDetails } from "./type";

const getQuestionBoxes: GetQuestionBoxes = (memberIdx) =>
  getAPI({ endPoint: API_PATH.GET_QUESTIONBOXES(memberIdx) });

const deleteQuestionBoxes: DeleteQuestionBoxes = questionBoxIdx =>
  deleteAPI({ endPoint: API_PATH.DELETE_QUESTIONBOXES(questionBoxIdx) });

const getQuestionDetails: GetQuestionDetails = (questionBoxId) =>
  getAPI({ endPoint: API_PATH.GET_QUESTION_DETAILS(questionBoxId) });

export default {
  getQuestionBoxes,
  deleteQuestionBoxes,
  getQuestionDetails,
};
