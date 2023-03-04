import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import { RatingDetail } from "api/mypage/types";
import * as Config from "components/common/chartConfig";
import dataGenerator from "./generateData";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultChartAiProps = {
  resultDetail: RatingDetail;
}

const ResultChartAi = (props: ResultChartAiProps) => {
  const {
    resultDetail,
  } = props;

  return (
    <StyledChartWrap>
      <StyledTitle>문제당 이탈 횟수</StyledTitle>
      <StyledChartBox>
        <Line
          data={dataGenerator({ timeline: resultDetail.timelines })}
          options={Config.chartAiOption}
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
  border: 2px solid var(--main-black);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;

  & canvas {
    margin: 0;
  }
`;
