import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { RatingDetail } from "api/mypage/types";
import { replaceKeywordTags } from "./util";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultScriptProps = {
  resultDetail: RatingDetail;
};

const ResultScript = (props: ResultScriptProps) => {
  const { resultDetail: { scripts } } = props;

  const [ currQuestion, setCurrQuestion ] = useState("Q1");
  const [ currScript, setCurrScript ] = useState(scripts[0]?.script ?? "");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrQuestion(event.target.value);

    const questionNumber = event.target.value.match(/\d+/g)?.[0] ?? 0;
    setCurrScript(scripts[Number(questionNumber) - 1].script);
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
          <InputLabel id="result-detail-questions">문제</InputLabel>
          <Select
            labelId="result-detail-questions"
            id="result-detail-questions"
            value={currQuestion}
            label="문제"
            sx={{
              color: "var(--main-black)",
              fontSize: "1.4rem",
              fontWeight: 500,
            }}
            onChange={handleChange}
          >
            {scripts.map(({ questionTitle }, idx) =>
              <MenuItem
                key={idx}
                value={`Q${idx + 1}`}
                sx={{
                  color: "var(--main-black)",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                }}
              >
                Q{idx + 1}. {questionTitle}
              </MenuItem>,
            )}
          </Select>
        </FormControl>

        <StyledScriptContent
          dangerouslySetInnerHTML={{
            __html: replaceKeywordTags({
              script: currScript,
              tag: "strong",
            })
          || "<span>작성된 내용이 없습니다.</span>",
          }}
        />
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
  border: 2px solid var(--main-black);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
`;

const StyledScriptContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  margin: 0 auto;
  text-align: left;
  overflow-y: auto;
  word-break: keep-all;
  font-size: 1.4rem;

  & strong {
    display: inline;
    box-shadow: inset 0 -10px 0 #a0ec2e90;
  }

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
`;
