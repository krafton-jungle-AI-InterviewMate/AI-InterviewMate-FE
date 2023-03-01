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
            sx={{
              color: "var(--main-black)",
              fontWeight: 500,
            }}
            onChange={handleChange}
          >
            <MenuItem value="Q1">
              Q1. 우리 회사에 지원한 이유는?
            </MenuItem>
            <MenuItem value="Q2">
              Q2. 동료와의 갈등을 어떻게 해결하실건가요?
            </MenuItem>
          </Select>
        </FormControl>

        <p>
          저는 이 회사서 열정적으로 일 해서 한 손에는 돈을 다른 한 손에는 명예를 움켜지기위해 지원 했습니다.
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
