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
import { usePostInterviewRooms } from "hooks/queries/interview";
import { useNavigate } from "react-router";
import { RoomTypes } from "api/mypage/types";
import { questionBoxes } from "api/questionBoxes/type";

interface InputRoomFormProps {
  email?: string;
  roomName: string;
  roomPeopleNum?: number;
  roomPassword?: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionBoxIdx: number;
  roomTime?: number;
}

function UserRoomForm({ onClickModalClose, roomType, questionBoxes }) {
  const navigate = useNavigate();
  const [ isPrivate, setIsPrivate ] = useState(false);
  const feedback = useSetRecoilState(feedbackAtom);
  const onChangePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setIsPrivate(value === "true" ? true : false);
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
  } = useForm<InputRoomFormProps>();

  const { mutate, isLoading } = usePostInterviewRooms();

  const onValid = (data: any) => {
    data["roomType"] = roomType;
    if (isLoading) {
      return;
    }
    mutate(
      { data },
      {
        onSuccess: () => {
          navigate("/interview/ready");
        },
        onError(error) {
          alert(error);
        },
      },
    );
  };
  const roomPeopleNumArr = [ 1, 2, 3 ];
  const isPrivateArr = [ false, true ];
  const FeedbackArr = [ "ON", "OFF" ];
  const roomTimeArr = [ 15, 30, 45, 60 ];
  return (
    <StyledUserRoomForm
      roomNameError={errors.roomName?.message}
      passwordError={errors.roomPassword?.message}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email")} readOnly hidden value="user4@test.com" />
        <div className="inputContent">
          <label htmlFor="roomName">방 제목</label>
          <input
            {...register("roomName", {
              required: "방 제목을 입력해주세요.",
              minLength: {
                value: 2,
                message: "최소 2자 ~ 최대 10자까지 입력 가능합니다.",
              },
              maxLength: {
                value: 10,
                message: "최소 2자 ~ 최대 10자까지 입력 가능합니다.",
              },
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
          {errors.roomName?.message ? (
            <span className="error">
              <AiOutlineInfoCircle className="errorIcon" size={24} />
              {errors.roomName.message}
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
              {roomPeopleNumArr.map((data, idx) => (
                <FormControlLabel
                  key={`roomPeopleNum${idx}`}
                  value={data + 1}
                  control={<Radio {...register("roomPeopleNum", { required: true })} />}
                  label={`${data}명`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>공개 여부</FormLabel>
            <RadioGroup row>
              {isPrivateArr.map((data, idx) => (
                <FormControlLabel
                  key={`isPrivate${idx}`}
                  value={data}
                  control={
                    <Radio
                      {...register("isPrivate", { required: true })}
                      onChange={onChangePublic}
                    />
                  }
                  label={data ? "비공개" : "공개"}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        {isPrivate ? (
          <>
            <div className="inputContent">
              <label htmlFor="password">비밀번호</label>
              <input
                {...register("roomPassword", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 3,
                    message: "3 ~ 10자리의 숫자를 입력해주세요.",
                  },
                  maxLength: {
                    value: 10,
                    message: "3 ~ 10자리의 숫자를 입력해주세요.",
                  },
                  pattern: {
                    value: /^[0-9|]+$/gi,
                    message: "숫자만 입력해주세요.",
                  },
                })}
                id="password"
                type="password"
                required
                autoComplete="off"
              />
              {errors.roomPassword?.message ? (
                <span className="error">
                  <AiOutlineInfoCircle className="errorIcon" size={24} />
                  {errors.roomPassword.message}
                </span>
              ) : null}
            </div>
            <span className="guide">비밀번호로 사용될 3 ~ 10자리의 숫자를 입력해주세요.</span>
          </>
        ) : null}
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>실시간 피드백</FormLabel>
            <RadioGroup row>
              {FeedbackArr.map((data, idx) => (
                <FormControlLabel
                  key={`Feedback${idx}`}
                  value={data}
                  control={<Radio onChange={onChangeFeedback} required />}
                  label={data}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <span className="guide">실시간 피드백 설정은 방 생성 이후에는 수정하실 수 없습니다.</span>
        <div className="inputContent">
          <label htmlFor="question">질문 꾸러미</label>
          <select id="question" {...register("roomQuestionBoxIdx", { required: true })}>
            {questionBoxes.map((data: questionBoxes, idx: number) => (
              <option key={idx} value={data.idx}>
                {data.boxName}
              </option>
            ))}
          </select>
        </div>
        <span className="guide">면접관에게 보여질 질문 꾸러미를 선택해주세요.</span>
        <div className="inputContent">
          <FormControl className="radioForm">
            <FormLabel>시간 제한</FormLabel>
            <RadioGroup row>
              {roomTimeArr.map((data, idx) => (
                <FormControlLabel
                  key={`roomTime${idx}`}
                  value={data}
                  control={<Radio {...register("roomTime", { required: true })} />}
                  label={`${data}분`}
                />
              ))}
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

interface StyledUserRoomFormProps {
  roomNameError?: string;
  passwordError?: string;
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

export default UserRoomForm;
