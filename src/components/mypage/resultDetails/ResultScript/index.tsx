import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

const ResultScript = () => {
  const [ currQuestion, setCurrQuestion ] = useState("Q1");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrQuestion(event.target.value);
  };

  return (
    <StyledScriptWrap>
      <StyledTitle>답변 스크립트</StyledTitle>
      <StyledScriptBox>
        <FormControl
          sx={{
            m: 1,
            width: 460,
          }}
          size="small"
        >
          <InputLabel id="demo-select-small">문제</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={currQuestion}
            label="문제"
            onChange={handleChange}
          >
            <MenuItem value="Q1">
              Q1. 프로세스와 스레드의 차이는 무엇입니까?
            </MenuItem>
            <MenuItem value="Q2">
              Q2. 가상 메모리란 무엇입니까?
            </MenuItem>
            <MenuItem value="Q3">
              Q3. 멀티 스레드 프로그래밍의 단점은 무엇입니까?
            </MenuItem>
          </Select>
        </FormControl>

        <p>
          로렘 입숨은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은
          그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로,
          최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에
          시각 디자인 프로젝트 모형의 채움 글로도 이용된다.
          로렘 입숨은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은
          그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로,
          최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에
          시각 디자인 프로젝트 모형의 채움 글로도 이용된다.
          로렘 입숨은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은
          그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로,
          최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에
          시각 디자인 프로젝트 모형의 채움 글로도 이용된다.
        </p>
      </StyledScriptBox>
    </StyledScriptWrap>
  );
};

export default ResultScript;

const StyledScriptWrap = styled.div`
  flex-grow: 1;
  margin-left: 40px;
  align-self: flex-start;
  width: 500px;
  height: 340px;
`;

const StyledTitle = styled.h3`
  margin: 0;
  ${commonLabelStyle}
  padding: 0;
  text-align: left;
`;

const StyledScriptBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;

  & p {
    text-align: left;
    overflow-y: auto;
    word-break: keep-all;

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: var(--main-gray);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--push-gray);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, .2);
    }
  }
`;
