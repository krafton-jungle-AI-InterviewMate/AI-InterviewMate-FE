import { StyledBtn } from "styles/StyledBtn";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { feedbackAtom } from "store/interview/atom";

interface StyledUserRoomFormProps {
  roomNameError: string | undefined;
  passwordError: string | undefined;
}

const StyledUserRoomForm = styled.div<StyledUserRoomFormProps>`
  form {
    display: flex;
    flex-direction: column;
    .inputContent {
      display: flex;
      align-items: center;
      margin-top: 20px;
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
        &:focus {
          outline: none;
        }
      }
      #roomName {
        border-color: ${props => (props.roomNameError ? "var(--main-alert)" : "var(--main-black)")};
      }
      #password {
        border-color: ${props => (props.passwordError ? "var(--main-alert)" : "var(--main-black)")};
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
      .error {
        display: flex;
        align-items: center;
        color: var(--main-alert);
        margin-left: 20px;
        font-size: 12px;
        .errorIcon {
          margin-right: 5px;
        }
      }
    }
    span.guide {
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      margin-left: 140px;
      color: var(--font-gray);
    }
    .submitAndCancel {
      display: flex;
      justify-content: space-between;
      margin-top: 80px;
    }
  }
`;

interface UserRoomFormProps {
  email?: string;
  roomName: string;
  roomPeopleNum: number;
  roomPassword?: string;
  isPrivate: boolean;
  roomType: "AI" | "USER";
  roomQuestionboxIdx: number;
  roomQuestionNum?: number;
  roomTime: number;
}

function UserRoomForm({ onClickModalClose, roomType }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const feedback = useSetRecoilState(feedbackAtom);
  const onChangePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setIsPrivate(value === "공개" ? false : true);
  };

  const onChangeFeedback = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    feedback(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRoomFormProps>();
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <StyledUserRoomForm
      roomNameError={errors?.roomName?.message}
      passwordError={errors?.roomPassword?.message}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("roomType")} readOnly hidden value={roomType} />
        <div className="inputContent">
          <label htmlFor="roomName">방 제목</label>
          <input
            {...register("roomName", {
              required: "방 제목을 입력해주세요.",
              minLength: { value: 2, message: "최소 2자 ~ 최대 10자까지 입력 가능합니다." },
              maxLength: { value: 10, message: "최소 2자 ~ 최대 10자까지 입력 가능합니다." },
              pattern: {
                value: /[A-Z|a-z|0-9|ㄱ-ㅎ|가-힣|]+$/gi,
                message: "특수문자는 사용 불가능합니다.",
              },
            })}
            required
            type="text"
            id="roomName"
            autoComplete="off"
          />
          {errors?.roomName?.message ? (
            <span className="error">
              <AiOutlineInfoCircle className="errorIcon" size={24} />
              {errors?.roomName?.message}
            </span>
          ) : null}
        </div>
        <span className="guide">
          최소 2자 ~ 최대 10자까지 입력 가능합니다. 특수문자는 사용 불가능합니다. (띄어쓰기 제외)
        </span>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>면접관 수</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value={1}
                control={<Radio {...register("roomPeopleNum", { required: true })} />}
                label="1명"
              />
              <FormControlLabel
                value={2}
                control={<Radio {...register("roomPeopleNum", { required: true })} />}
                label="2명"
              />
              <FormControlLabel
                value={3}
                control={<Radio {...register("roomPeopleNum", { required: true })} />}
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
                control={
                  <Radio {...register("isPrivate", { required: true })} onChange={onChangePublic} />
                }
                label="공개"
              />
              <FormControlLabel
                value="비공개"
                control={
                  <Radio {...register("isPrivate", { required: true })} onChange={onChangePublic} />
                }
                label="비공개"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {!isPrivate ? null : (
          <>
            <div className="inputContent">
              <label htmlFor="password">비밀번호</label>
              <input
                {...register("roomPassword", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: { value: 3, message: "3 ~ 10자리의 숫자를 입력해주세요." },
                  maxLength: { value: 10, message: "3 ~ 10자리의 숫자를 입력해주세요." },
                  pattern: { value: /^[0-9|]+$/gi, message: "숫자만 입력해주세요." },
                })}
                id="password"
                type="password"
                required
                autoComplete="off"
              />
              {errors?.roomPassword?.message ? (
                <span className="error">
                  <AiOutlineInfoCircle className="errorIcon" size={24} />
                  {errors?.roomPassword?.message}
                </span>
              ) : null}
            </div>
            <span className="guide">비밀번호로 사용될 3 ~ 10자리의 숫자를 입력해주세요.</span>
          </>
        )}
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>실시간 피드백</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="ON"
                control={<Radio onChange={onChangeFeedback} />}
                label="ON"
              />
              <FormControlLabel
                value="OFF"
                control={<Radio onChange={onChangeFeedback} />}
                label="OFF"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="inputContent">
          <label htmlFor="question">질문 꾸러미</label>
          <select id="question" {...register("roomQuestionboxIdx", { required: true })}>
            <option value="1">질문 꾸러미 1</option>
          </select>
        </div>
        <span className="guide">면접관에게 보여질 질문 꾸러미를 선택해주세요.</span>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>시간 제한</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value={15}
                control={<Radio {...register("roomTime", { required: true })} />}
                label="15분"
              />
              <FormControlLabel
                value={30}
                control={<Radio {...register("roomTime", { required: true })} />}
                label="30분"
              />
              <FormControlLabel
                value={45}
                control={<Radio {...register("roomTime", { required: true })} />}
                label="45분"
              />
              <FormControlLabel
                value={60}
                control={<Radio {...register("roomTime", { required: true })} />}
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
