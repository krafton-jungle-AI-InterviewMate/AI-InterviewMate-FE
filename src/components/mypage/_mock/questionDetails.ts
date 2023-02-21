import { QuestionDetail, QuestionBox } from "api/questionBoxes/type";
import { Member } from "types/apis";

const fakeUser: Member = {
  idx: 111,
  nickname: "안예인",
  email: "yein.ahn9@gmail.com",
  authProvider: "github",
  refreshToken: "",
};

const questionBox: QuestionBox = {
  idx: 2,
  member: fakeUser,
  boxName: "나의 질문 꾸러미",
  questionNum: 3,
};

const questionDetailList: QuestionDetail[] = [
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
  {
    idx: 1,
    questionBox,
    questionTitle: "제일 좋아하는 과자는 무엇인가요?",
    keyword1: "오징어",
    keyword2: "땅콩",
    keyword3: "꿀맛",
  },
  {
    idx: 2,
    questionBox,
    questionTitle: "자바스크립트를 좋아하시나요?",
    keyword1: "사랑",
  },
  {
    idx: 3,
    questionBox,
    questionTitle: "저 혹시 홍대 가려면",
    keyword1: "뉴진스의",
    keyword2: "하입보이요",
  },
];

export default questionDetailList;
