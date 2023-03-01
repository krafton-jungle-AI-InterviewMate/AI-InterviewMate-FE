import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import * as Config from "components/common/chartConfig";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

const data = {
  labels: [ "Q1", "Q2", "Q3" ],
  datasets: [
    {
      id: 1,
      label: Config.LABEL_EYE,
      data: [ 5, 6, 2 ],
      borderColor: Config.BORDER_COLOR_EYE,
      backgroundColor: Config.BACKGROUND_COLOR_EYE,
      borderWidth: Config.BORDER_WIDTH,
    },
    {
      id: 2,
      label: Config.LABEL_ATTITUDE,
      data: [ 3, 2, 1 ],
      borderColor: Config.BORDER_COLOR_ATTITUDE,
      backgroundColor: Config.BACKGROUND_COLOR_ATTITUDE,
      borderWidth: Config.BORDER_WIDTH,
    },
  ],
};

const ResultChartAi = () => {
  return (
    <StyledChartWrap>
      <StyledTitle>문제당 이탈 횟수</StyledTitle>
      <StyledChartBox>
        <Line data={data} options={Config.chartAiOption}
        />
      </StyledChartBox>
    </StyledChartWrap>
  );
};

export default ResultChartAi;

const StyledChartWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 640px;
  height: 380px;
`;

const StyledTitle = styled.h3`
  margin: 0;
  ${commonLabelStyle}
  padding: 0;
  text-align: left;
`;

const StyledChartBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;

  & canvas {
    margin: 0;
  }
`;
