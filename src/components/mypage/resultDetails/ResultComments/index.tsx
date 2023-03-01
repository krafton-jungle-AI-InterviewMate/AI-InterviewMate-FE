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

const ResultComments = () => {
  const [ currInterviewer, setCurrInterviewer ] = useState("면접관1");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrInterviewer(event.target.value);
  };

  return (
    <StyledCommentsWrap>
      <StyledTitle>면접관 코멘트</StyledTitle>
      <StyledCommentsBox>
        <FormControl
          sx={{
            m: 1,
            width: 460,
          }}
          size="small"
        >
          <InputLabel id="demo-select-small">면접관</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={currInterviewer}
            label="면접관"
            sx={{
              color: "var(--main-black)",
              fontWeight: 500,
            }}
            onChange={handleChange}
          >
            <MenuItem value="면접관1">
              면접관1
            </MenuItem>
            <MenuItem value="면접관2">
              면접관2
            </MenuItem>
          </Select>
        </FormControl>

        <p>
          자신감 있는 모습이 보기 좋았습니다.
        </p>
      </StyledCommentsBox>
    </StyledCommentsWrap>
  );
};

export default ResultComments;

const StyledCommentsWrap = styled.div`
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

const StyledCommentsBox = styled.div`
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
