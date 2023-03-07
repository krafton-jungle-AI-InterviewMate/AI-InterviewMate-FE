import { StyledBtn } from "styles/StyledBtn";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  feedbackAtom,
  aiRoomResponseAtom,
  interviewDataAtom,
  recordModeAtom,
} from "store/interview/atom";
import { usePostInterviewRooms } from "hooks/queries/interview";
import { useNavigate } from "react-router-dom";
import { RoomTypes } from "api/mypage/types";
import { useState } from "react";
import { QuestionBoxes } from "api/questionBoxes/type";
import { FeedbackArr } from "constants/interview";
import { PagesPath } from "constants/pages";
import { PostInterviewRoomsPayloadData } from "api/interview/type";

interface InputRoomFormProps {
  email?: string;
  roomName: string;
  isPrivate?: boolean;
  roomType: RoomTypes;
  roomQuestionBoxIdx: number;
  roomQuestionNum?: number;
  feedback: "ON" | "OFF";
  record: "ON" | "OFF";
}

const AiRoomForm = ({ onClickModalClose, roomType, questionBoxes }) => {
  const navigate = useNavigate();
  const [ feedback, setFeedback ] = useRecoilState(feedbackAtom);
  const [ record, setRecord ] = useRecoilState(recordModeAtom);
  const setAiRoomResponse = useSetRecoilState(aiRoomResponseAtom);
  const setInterviewData = useSetRecoilState(interviewDataAtom);
  const [ questionNum, setQuestionNum ] = useState(0);

  const onChangeFeedback = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setFeedback(value);
  };

  const onChangeRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setRecord(value === "ON");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputRoomFormProps>({
    defaultValues: {
      roomName: "AI와 면접 연습",
    },
  });

  const { mutate, isLoading } = usePostInterviewRooms();

  const onValid = (data: InputRoomFormProps) => {
    data["isPrivate"] = true;
    if (isLoading) {
      return;
    }

    const {
      roomName, isPrivate, roomQuestionBoxIdx, roomQuestionNum,
    } = data;

    const payload: PostInterviewRoomsPayloadData = {
      roomName,
      isPrivate,
      roomType,
      roomQuestionBoxIdx,
      roomQuestionNum,
    };

    mutate(
      {
        data: payload,
      },
      {
        onSuccess: ({ data }) => {
          setAiRoomResponse(data);
          setInterviewData(data.data);
          navigate(PagesPath.INTERVIEW_READY);
        },
        onError(error) {
          alert(error);
        },
      },
    );
  };

  return (
    <StyledUserRoomForm roomNameError={errors?.roomName?.message}>
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
          최소 2자 ~ 최대 10자까지 입력 가능합니다. 특수문자는 사용 불가능합니다. <br /> (띄어쓰기
          제외)
        </span>
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
          <p>면접 영상 녹화</p>
          {[ "ON", "OFF" ].map((data, idx) => (
            <StyledRadioWrap key={`Record${idx}`}>
              <label htmlFor={`Record${idx}`}>
                {data}
              </label>
              <input
                {...register("record")}
                type="radio"
                value={data}
                id={`Record${idx}`}
                required
                onChange={onChangeRecord}
                checked={data === "ON" ? record : !record}
              />
            </StyledRadioWrap>
          ))}
        </div>
        <span className="guide">실시간 녹화 설정은 방 생성 이후에는 수정하실 수 없습니다.</span>
        <div className="inputContent">
          <label htmlFor="questionNum">질문 개수</label>
          <input
            {...register("roomQuestionNum", {
              required: "질문 개수를 입력해주세요.",
              pattern: {
                value: /^[0-9|]+$/gi,
                message: "숫자만 입력해주세요.",
              },
              min: {
                value: 1,
                message: "1개 이상 입력해주세요.",
              },
              max: {
                value: 10,
                message: "10개를 넘을 수 없습니다.",
              },
            })}
            id="questionNum"
            type="text"
            required
            autoComplete="off"
            onChange={event => {
              const {
                target: { value },
              } = event;
              setQuestionNum(parseInt(value));
            }}
          />
          {errors.roomQuestionNum?.message ? (
            <span className="error">
              <AiOutlineInfoCircle className="errorIcon" size={24} />
              {errors.roomQuestionNum.message}
            </span>
          ) : null}
        </div>
        <div className="inputContent">
          <label htmlFor="question">질문 꾸러미</label>
          <select id="question" {...register("roomQuestionBoxIdx", { required: true })}>
            {questionNum ? (
              questionBoxes.map((data: QuestionBoxes, idx: number) =>
                data.questionNum >= questionNum ? (
                  <option key={idx} value={data.questionBoxIdx}>
                    {data.questionBoxName}
                  </option>
                ) : null,
              )
            ) : (
              <option value="">질문 꾸러미를 선택해주세요.</option>
            )}
          </select>
        </div>
        <span className="guide">면접관에게 보여질 질문 꾸러미를 선택해주세요.</span>
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
};

interface StyledUserRoomFormProps {
  roomNameError?: string;
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

  & label {
    text-align: left !important;
  }

  & input,
  & label {
    width: 100px !important;
  }

  & input {
    height: 20px !important;
  }
`;

export default AiRoomForm;
