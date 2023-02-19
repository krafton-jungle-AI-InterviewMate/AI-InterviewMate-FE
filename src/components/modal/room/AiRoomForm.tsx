import { StyledBtn } from "styles/StyledBtn";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { feedbackAtom } from "store/interview/atom";
import { usePostInterviewRooms } from "hooks/queries/lobby/lobby";
import { useNavigate } from "react-router";
import { RoomTypes } from "api/mypage/types";

interface InputRoomFormProps {
  email?: string;
  roomName: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionboxIdx: number;
  roomQuestionNum?: number;
}

const AiRoomForm = ({ onClickModalClose, roomType }) => {
  const navigate = useNavigate();
  const setFeedback = useSetRecoilState(feedbackAtom);

  const onChangeFeedback = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setFeedback(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputRoomFormProps>();

  const { mutate, isLoading } = usePostInterviewRooms();

  const onValid = (data: any) => {
    data["roomType"] = roomType;
    data["isPrivate"] = true;
    if (isLoading) {
      return;
    }
    mutate(
      {
        roomIdx: 1,
        data,
      },
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
  const FeedbackArr = ["ON", "OFF"];
  return (
    <StyledUserRoomForm roomNameError={errors?.roomName?.message}>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email")} readOnly hidden value="user4@test.com" />
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
            <FormLabel>실시간 피드백</FormLabel>
            <RadioGroup row>
              {FeedbackArr.map((data, idx) => (
                <FormControlLabel
                  key={`Feedback${idx}`}
                  value={data}
                  control={<Radio onChange={onChangeFeedback} />}
                  label={data}
                />
              ))}
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
            <FormLabel>질문 개수</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value={3}
                control={<Radio {...register("roomQuestionNum", { required: true })} />}
                label="3개"
              />
              <FormControlLabel
                value={5}
                control={<Radio {...register("roomQuestionNum", { required: true })} />}
                label="5개"
              />
              <FormControlLabel
                value={8}
                control={<Radio {...register("roomQuestionNum", { required: true })} />}
                label="8개"
              />
              <FormControlLabel
                value={10}
                control={<Radio {...register("roomQuestionNum", { required: true })} />}
                label="10개"
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
};

interface StyledUserRoomFormProps {
  roomNameError: string | undefined;
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

export default AiRoomForm;
