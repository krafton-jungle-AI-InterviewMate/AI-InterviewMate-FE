import { deleteAPI, getAPI, putAPI } from "api/axios";
import { API_PATH } from "constants/api";
import {
  DeleteQuestion,
  DeleteQuestionBoxes,
  GetQuestionBoxes,
  GetQuestionDetails,
  PutQuestionDetails,
  PutQuestionBoxName,
} from "./type";

const getQuestionBoxes: GetQuestionBoxes = (memberIdx) =>
  getAPI({ endPoint: API_PATH.GET_QUESTIONBOXES(memberIdx) });

const deleteQuestionBoxes: DeleteQuestionBoxes = questionBoxIdx =>
  deleteAPI({ endPoint: API_PATH.DELETE_QUESTIONBOXES(questionBoxIdx) });

const getQuestionDetails: GetQuestionDetails = (questionBoxId) =>
  getAPI({ endPoint: API_PATH.GET_QUESTION_DETAILS(questionBoxId) });

const deleteQuestion: DeleteQuestion = (questionIdx) =>
  deleteAPI({ endPoint: API_PATH.DELETE_QUESTION(questionIdx) });

const putQuestionDetails: PutQuestionDetails = ({ questionIdx, ...data }) =>
  putAPI({
    endPoint: API_PATH.PUT_QUESTION_DETAILS(questionIdx),
    data,
  });

const putQuestionBoxName: PutQuestionBoxName = ({ questionBoxIdx, ...data }) =>
  putAPI({
    endPoint: API_PATH.PUT_QUESTIONBOX_NAME(questionBoxIdx),
    data,
  });

export default {
  getQuestionBoxes,
  deleteQuestionBoxes,
  getQuestionDetails,
  deleteQuestion,
  putQuestionDetails,
  putQuestionBoxName,
};
