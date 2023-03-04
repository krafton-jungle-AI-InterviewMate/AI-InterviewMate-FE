import { Timestamp } from "api/mypage/types";
import * as Config from "components/common/chartConfig";

type DataGeneratorParams = {
  timeline: Timestamp[];
};

type Question = {
  eye: number;
  attitude: number;
};

const dataGenerator = (params: DataGeneratorParams) => {
  const { timeline } = params;

  const totalQuestion = timeline.filter(({ type }) => type === "question").length;
  const questions: { [question: number]: Question } = {};

  for (let i = 0; i <= totalQuestion; i++) {
    questions[i] = {
      eye: 0,
      attitude: 0,
    };
  }

  let currQuestion = 0;
  timeline.forEach(({ type }) => {
    if (type === "question") {
      currQuestion += 1;
    }
    else {
      questions[currQuestion][type] += 1;
    }
  });

  const template = new Array(totalQuestion).fill(0);

  const data = {
    labels: template.map((_, idx) => `Q${idx + 1}`),
    datasets: [
      {
        id: 1,
        label: Config.LABEL_EYE,
        data: template.map((_, idx) => {
          return questions[idx + 1].eye;
        }),
        borderColor: Config.BORDER_COLOR_EYE,
        backgroundColor: Config.BACKGROUND_COLOR_EYE,
        borderWidth: Config.BORDER_WIDTH,
      },
      {
        id: 2,
        label: Config.LABEL_ATTITUDE,
        data: template.map((_, idx) => {
          return questions[idx + 1].attitude;
        }),
        borderColor: Config.BORDER_COLOR_ATTITUDE,
        backgroundColor: Config.BACKGROUND_COLOR_ATTITUDE,
        borderWidth: Config.BORDER_WIDTH,
      },
    ],
  };

  return data;
};

export default dataGenerator;
