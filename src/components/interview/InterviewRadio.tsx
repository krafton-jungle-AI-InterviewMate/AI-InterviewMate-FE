import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import styled from "@emotion/styled";

const StyledInterviewRadio = styled.div`
  .radioContents {
    display: flex;
    flex-direction: row;
    align-items: center;
    label {
      font-size: 14px;
      color: var(--main-black);
    }
    .radioForm {
      margin-left: 30px;
    }
  }
`;

interface InterviewRadioProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelName: string;
}

function InterviewRadio({ handleChange, labelName }: InterviewRadioProps) {
  return (
    <StyledInterviewRadio>
      <FormControl className="radioContents">
        <FormLabel>{labelName}</FormLabel>
        <RadioGroup row name="row-radio-buttons-group" className="radioForm">
          <FormControlLabel
            name={labelName}
            value={1}
            control={<Radio onChange={handleChange} />}
            label="1점"
          />
          <FormControlLabel
            name={labelName}
            value={2}
            control={<Radio onChange={handleChange} />}
            label="2점"
          />
          <FormControlLabel
            name={labelName}
            value={3}
            control={<Radio onChange={handleChange} />}
            label="3점"
          />
          <FormControlLabel
            name={labelName}
            value={4}
            control={<Radio onChange={handleChange} />}
            label="4점"
          />
          <FormControlLabel
            name={labelName}
            value={5}
            control={<Radio onChange={handleChange} />}
            label="5점"
          />
        </RadioGroup>
      </FormControl>
    </StyledInterviewRadio>
  );
}

export default InterviewRadio;
