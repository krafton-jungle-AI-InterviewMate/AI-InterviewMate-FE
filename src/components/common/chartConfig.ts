import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions } from "chart.js";

export const LABEL_EYE = "시선 이탈";
export const LABEL_ATTITUDE = "자세 이탈";

export const BORDER_COLOR_EYE = "#ffa620";
export const BACKGROUND_COLOR_EYE = "#ed8e00";

export const BORDER_COLOR_ATTITUDE = "#1785db";
export const BACKGROUND_COLOR_ATTITUDE = "#146eb4";

export const BORDER_WIDTH = 2;

type ChartOptionType =
  & _DeepPartialObject<CoreChartOptions<"line">
  & ElementChartOptions<"line">
  & PluginChartOptions<"line">
  & DatasetChartOptions<"line">
  & ScaleChartOptions<"line">
  & LineControllerChartOptions>;

export const chartUserOption: ChartOptionType = {
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
};

export const chartAiOption: ChartOptionType = {
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
};

