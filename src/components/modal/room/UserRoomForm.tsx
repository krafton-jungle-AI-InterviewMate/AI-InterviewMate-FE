import { StyledBtn } from "styles/StyledBtn";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetRecoilState, useRecoilState } from "recoil";
import { feedbackAtom, interviewDataAtom, isInterviewerAtom } from "store/interview/atom";
import { usePostInterviewRooms } from "hooks/queries/interview";
import { useNavigate } from "react-router-dom";
import { RoomTypes } from "api/mypage/types";
import { QuestionBoxes } from "api/questionBoxes/type";

interface InputRoomFormProps {
  email?: string;
  roomName: string;
  roomPeopleNum: string;
  roomPassword?: string;
  isPrivate: boolean;
  roomType: RoomTypes;
  roomQuestionBoxIdx: number;
  roomTime: string;
  feedback: "ON" | "OFF";
  record: "ON" | "OFF";
}

function UserRoomForm({ onClickModalClose, questionBoxes }) {
  const setUserInterviewData = useSetRecoilState(interviewDataAtom);
  const [ feedback, setFeedback ] = useRecoilState(feedbackAtom);
  const setIsInterviewer = useSetRecoilState(isInterviewerAtom);

  const navigate = useNavigate();
  const [ isPrivate, setIsPrivate ] = useState(false);
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
    setFeedback(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputRoomFormProps>({
    defaultValues: {
      roomName: "면접 화이팅",
      roomPeopleNum: "2",
      isPrivate: false,
      roomType: "USER",
      roomTime: String(15),
    },
  });

  const { mutate, isLoading } = usePostInterviewRooms();

  const onValid = (data) => {
    if (isLoading) {
      return;
    }

    mutate(
      { data },
      {
        onSuccess: ({ data }) => {
          setUserInterviewData(data.data);
          setIsInterviewer(false);
          navigate("/interview/user");
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
          최소 2자 ~ 최대 10자까지 입력 가능합니다. 특수문자는 사용 불가능합니다. <br /> (띄어쓰기
          제외)
        </span>
        <div className="inputContent">
          <p>면접관 수</p>
          {roomPeopleNumArr.map((data, idx) => (
            <StyledRadioWrap key={`roomPeopleNum${idx}`}>
              <label htmlFor={`roomPeopleNum${idx}`}>
                {data}명
              </label>
              <input
                {...register("roomPeopleNum")}
                type="radio"
                value={data + 1}
                id={`roomPeopleNum${idx}`}
                required
              />
            </StyledRadioWrap>
          ))}
        </div>
        <div className="inputContent">
          <p>공개 여부</p>
          {isPrivateArr.map((data, idx) => (
            <StyledRadioWrap key={`isPrivate${idx}`}>
              <label htmlFor={`isPrivate${idx}`}>
                {data ? "비공개" : "공개"}
              </label>
              <input
                {...register("isPrivate")}
                type="radio"
                value={String(data)}
                id={`isPrivate${idx}`}
                required
                checked={isPrivate === data}
                onChange={onChangePublic}
              />
            </StyledRadioWrap>
          ))}
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
          <p>실시간 피드백</p>
          {FeedbackArr.map((data, idx) => (
            <StyledRadioWrap key={`Feedback${idx}`}>
              <label htmlFor={`Feedback${idx}`}>
                {data}
              </label>
              <input
                {...register("feedback")}
                type="radio"
                value={data}
                id={`Feedback${idx}`}
                required
                onChange={onChangeFeedback}
                checked={feedback === data}
              />
            </StyledRadioWrap>
          ))}
        </div>
        <span className="guide">실시간 피드백 설정은 방 생성 이후에는 수정하실 수 없습니다.</span>
        <div className="inputContent">
          <label htmlFor="question">질문 꾸러미</label>
          <select id="question" {...register("roomQuestionBoxIdx", { required: true })}>
            {questionBoxes.map(
              (data: QuestionBoxes, idx: number) =>
                data.questionNum > 0 && (
                  <option key={idx} value={data.questionBoxIdx}>
                    {data.questionBoxName}
                  </option>
                ),
            )}
          </select>
        </div>
        <span className="guide">면접관에게 보여질 질문 꾸러미를 선택해주세요.</span>
        <div className="inputContent">
          <p>시간 제한</p>
          {roomTimeArr.map((data, idx) => (
            <StyledRadioWrap key={`roomTime${idx}`}>
              <label htmlFor={`roomTime${idx}`}>
                {data}분
              </label>
              <input
                {...register("roomTime")}
                type="radio"
                value={String(data)}
                id={`roomTime${idx}`}
                required
              />
            </StyledRadioWrap>
          ))}
        </div>
        <div className="submitAndCancel">
          <StyledBtn width="300px" height="58px" color="orange">
            확인
          </StyledBtn>
          <StyledBtn onClick={onClickModalClose} width="300px" height="58px" color="red">
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
      p {
        width: 200px;
      }
      label {
        display: inline-block;
        text-align: left;
        width: 200px;
        font-size: 1.6rem;
        font-weight: 500;
        font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
        color: var(--main-black);
      }
      input {
        width: 360px;
        height: 40px;
        border-color: var(--main-black);
        border-radius: 10px;
        border: 0.5px solid;
        padding: 5px 0 5px 10px;
        font-size: 1.6rem;
        &:focus {
          outline: none;
        }
      }
      p {
        font-size: 1.6rem;
      }
      #roomName {
        border-color: ${props => (props.roomNameError ? "var(--main-alert)" : "var(--main-black)")};
        font-size: 1.6rem;
      }
      #question {
        font-size: 1.6rem;
      }
      select {
        width: 370px;
        height: 40px;
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
        font-size: 1rem;
        .errorIcon {
          margin-right: 5px;
        }
      }
    }
    span.guide {
      font-size: 1rem;
      font-weight: 400;
      text-align: left;
      margin-left: 200px;
      margin-top: 16px;
      color: var(--font-gray);
    }
    .submitAndCancel {
      display: flex;
      justify-content: space-evenly;
      margin-top: 80px;
      & button {
        font-size: 1.6rem;
        font-weight: 500;
      }
    }
  }
`;

const StyledRadioWrap = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: center;
  margin-left: 14px;

  &:first-of-type {
    margin-left: 0;
  }

  & label {
    text-align: left !important;
    width: 100px !important;
  }

  & input {
    width: 20px !important;
    height: 30px !important;
    margin-right: 10px;
  }
`;

export default UserRoomForm;
