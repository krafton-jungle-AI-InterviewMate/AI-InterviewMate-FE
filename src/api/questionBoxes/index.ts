import { getAPI } from "api/axios";
import { API_PATH } from "constants/api";
import { GetQuestionBoxes } from "./type";

const getQuestionBoxes: GetQuestionBoxes = () => getAPI({ endPoint: API_PATH.GET_QUESTIONBOXES });

export default {
  getQuestionBoxes,
};
