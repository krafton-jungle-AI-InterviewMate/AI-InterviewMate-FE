import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import { getRandomArbitrary } from "./utils";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

const data = {
  labels: new Array(31).fill(0).map((_, idx) => idx),
  datasets: [
    {
      id: 1,
      label: "시선 이탈",
      data: new Array(31).fill(0).map((_) => getRandomArbitrary(0, 10)),
      borderColor: "#ffa620",
      backgroundColor: "#ed8e00",
      borderWidth: 2,
    },
    {
      id: 2,
      label: "자세 이탈",
      data: new Array(31).fill(0).map((_) => getRandomArbitrary(0, 10)),
      borderColor: "#1785db",
      backgroundColor: "#146eb4",
      borderWidth: 2,
    },
  ],
};

const ResultChartUser = () => {
  return (
    <StyledChartWrap>
      <StyledTitle>1분당 이탈 횟수</StyledTitle>
      <StyledChartBox>
        <Line data={data} options={{
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                padding: 10,
              },
            },
            tooltip: {
              usePointStyle: true,
              padding: 10,
              bodySpacing: 5,
              backgroundColor: "#777777b4",
              callbacks: {
                title: (context) => {
                  return context[0].label + "분";
                },
                label: (context) => {
                  const { dataset, formattedValue } = context;
                  return `${dataset.label} ${formattedValue}회`;
                },
              },
            },
          },
          scales: {
            x: {
              axis: "x",
              ticks: {
                stepSize: 1,
                autoSkip: false,
              },
              grid: {
                color: "#eee",
              },
            },
            y: {
              axis: "y",
              afterDataLimits: (scale) => {
                scale.max = scale.max * 1.2;
              },
              grid: {
                color: "#eee",
              },
            },
          },
        }}
        />
      </StyledChartBox>
    </StyledChartWrap>
  );
};

export default ResultChartUser;

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
