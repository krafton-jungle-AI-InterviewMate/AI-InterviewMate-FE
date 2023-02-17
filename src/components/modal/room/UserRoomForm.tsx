import { StyledBtn } from "styles/StyledBtn";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";
import { useState } from "react";

const StyledUserRoomForm = styled.div`
  .form {
    display: flex;
    flex-direction: column;
  }
  .inputContent {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
      display: inline-block;
      text-align: left;
      width: 140px;
      font-size: 16px;
      font-weight: 400;
      font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
      color: var(--main-black);
    }
    input {
      width: 360px;
      height: 24px;
      border-color: var(--main-black);
      border-radius: 10px;
      border: 0.5px solid;
      padding: 5px 0 5px 10px;
    }
    select {
      width: 370px;
      height: 34px;
      border-color: var(--main-black);
      border-radius: 10px;
      padding-left: 8px;
    }
    .radioForm {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .submitAndCancel {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
  }
`;

function UserRoomForm({ onClickModalClose }) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [isPublic, setIsPublic] = useState(true);

  const onChangePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setIsPublic(value === "공개" ? true : false);
  };

  const { register, handleSubmit, watch } = useForm();
  console.log(watch());
  return (
    <StyledUserRoomForm>
      <form onSubmit={onSubmit}>
        <div className="inputContent">
          <label htmlFor="roomName">방 제목</label>
          <input {...register("roomName")} type="text" id="roomName" />
        </div>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>면접관 수</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value={1}
                control={<Radio {...register("interviewer")} />}
                label="1명"
              />
              <FormControlLabel
                value={2}
                control={<Radio {...register("interviewer")} />}
                label="2명"
              />
              <FormControlLabel
                value={3}
                control={<Radio {...register("interviewer")} />}
                label="3명"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>공개 여부</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="공개"
                control={<Radio {...register("public")} onChange={onChangePublic} />}
                label="공개"
              />
              <FormControlLabel
                value="비공개"
                control={<Radio {...register("public")} onChange={onChangePublic} />}
                label="비공개"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {isPublic ? null : (
          <div className="inputContent">
            <label htmlFor="password">비밀번호</label>
            <input {...register("password")} id="password" type="text" />
          </div>
        )}
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>실시간 피드백</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="ON"
                control={<Radio {...register("feedback")} />}
                label="ON"
              />
              <FormControlLabel
                value="OFF"
                control={<Radio {...register("feedback")} />}
                label="OFF"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="inputContent">
          <label htmlFor="question">질문 꾸러미</label>
          <select id="question" {...register("question")}>
            <option value="1">질문 꾸러미 1</option>
          </select>
        </div>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>시간 제한</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value={15}
                control={<Radio {...register("interviewTime")} />}
                label="15분"
              />
              <FormControlLabel
                value={30}
                control={<Radio {...register("interviewTime")} />}
                label="30분"
              />
              <FormControlLabel
                value={45}
                control={<Radio {...register("interviewTime")} />}
                label="45분"
              />
              <FormControlLabel
                value={60}
                control={<Radio {...register("interviewTime")} />}
                label="60분"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="submitAndCancel">
          <StyledBtn width="380px" height="58px" color="orange">
            확인
          </StyledBtn>
          <StyledBtn onClick={onClickModalClose} width="380px" height="58px" color="red">
            취소
          </StyledBtn>
        </div>
      </form>
    </StyledUserRoomForm>
  );
}

export default UserRoomForm;
