import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetQuestionBoxes, GetQuestionDetails } from "./type";

const getQuestionBoxes: GetQuestionBoxes = (memberIdx) =>
  getAPI({ endPoint: API_PATH.GET_QUESTIONBOXES(memberIdx) });

const getQuestionDetails: GetQuestionDetails = (questionBoxId) =>
  getAPI({ endPoint: API_PATH.GET_QUESTION_DETAILS(questionBoxId) });

export default {
  getQuestionBoxes,
  getQuestionDetails,
};
