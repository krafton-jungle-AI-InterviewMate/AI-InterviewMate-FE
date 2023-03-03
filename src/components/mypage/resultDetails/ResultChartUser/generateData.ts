import { Timestamp } from "api/mypage/types";
import * as Config from "components/common/chartConfig";

type DataGeneratorParams = {
  timeline: Timestamp[];
};

const dataGenerator = (params: DataGeneratorParams) => {
  const { timeline } = params;

  const eye: { [minute: number]: number } = {};
  const attitude: { [minute: number]: number } = {};

  const max = Number(timeline[timeline.length - 1].timestamp.split(":")[0]);

  for (let i = 0; i <= max + 1; i++) {
    eye[i] = 0;
    attitude[i] = 0;
  }

  timeline.forEach(({ type, timestamp }) => {
    const key = Number(timestamp.split(":")[0]) + 1;

    if (type === "eye") {
      eye[key] += 1;
    }
    else {
      attitude[key] += 1;
    }
  });


  const data = {
    labels: new Array(max + 2).fill(0).map((_, idx) => idx),
    datasets: [
      {
        id: 1,
        label: Config.LABEL_EYE,
        data: Object.entries(eye).map(([ _, v ]) => v),
        borderColor: Config.BORDER_COLOR_EYE,
        backgroundColor: Config.BACKGROUND_COLOR_EYE,
        borderWidth: Config.BORDER_WIDTH,
        tension: 0.3,
      },
      {
        id: 2,
        label: Config.LABEL_ATTITUDE,
        data: Object.entries(attitude).map(([ _, v ]) => v),
        borderColor: Config.BORDER_COLOR_ATTITUDE,
        backgroundColor: Config.BACKGROUND_COLOR_ATTITUDE,
        borderWidth: Config.BORDER_WIDTH,
        tension: 0.3,
      },
    ],
  };

  return data;
};

export default dataGenerator;
