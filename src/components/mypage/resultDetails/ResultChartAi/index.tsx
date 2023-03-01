import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

const data = {
  labels: [ "Q1", "Q2", "Q3" ],
  datasets: [
    {
      id: 1,
      label: "시선 이탈",
      data: [ 5, 6, 2 ],
    },
    {
      id: 2,
      label: "자세 이탈",
      data: [ 3, 2, 1 ],
    },
  ],
};

const ResultChartAi = () => {
  return (
    <StyledChartWrap>
      <StyledTitle>문제당 이탈 횟수</StyledTitle>
      <StyledChartBox>
        <Line data={data} options={{
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                padding: 10,
              },
            },
          },
          scales: {
            y: {
              axis: "y",
              afterDataLimits: (scale) => {
                scale.max = scale.max * 1.2;
              },
            },
          },
        }}
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
