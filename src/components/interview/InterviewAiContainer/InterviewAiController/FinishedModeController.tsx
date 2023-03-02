import { useNavigate } from "react-router-dom";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerScriptAtom,
  motionCountAtom,
  irisCountAtom,
  aiInterviewNextProcessAtom,
  aiRoomResponseAtom,
  timelineRecordAtom,
} from "store/interview/atom";
import { usePostRatingViewee } from "hooks/queries/mypage";
import { PostRatingVieweePayloadData } from "api/mypage/types";

import styled from "@emotion/styled";

const FinishedModeController = () => {
  const navigate = useNavigate();

  const {
    timeline: {
      eyes,
      attitude,
      questionModeStart,
    },
  } = useRecoilValue(timelineRecordAtom);
  const motionCount = useRecoilValue(motionCountAtom);
  const irisCount = useRecoilValue(irisCountAtom);
  const aiRoomResponse = useRecoilValue(aiRoomResponseAtom);
  const answerScript = useRecoilValue(answerScriptAtom);
  const setAiInterviewNextProcess = useSetRecoilState(aiInterviewNextProcessAtom);

  const {
    mutate,
    isLoading,
  } = usePostRatingViewee();

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }

    if (!aiRoomResponse) {
      return;
    }

    const {
      data: {
        roomIdx,
      },
    } = aiRoomResponse;

    const data: PostRatingVieweePayloadData = {
      videoUrl: null, // TODO: 녹화 모드 ON일 땐 video API 연동 후 받아온 url 값 넣기
      eyeTimelines: eyes,
      attitudeTimelines: attitude,
      questionTimelines: questionModeStart,
      comments: [],
      scripts: answerScript.map((script, idx) => ({
        questionIdx: idx + 1, // DB index 1부터 시작
        script,
      })),
    };

    mutate({
      roomIdx,
      data,
    }, {
      onSuccess: () => {
        setAiInterviewNextProcess("end");
        navigate("/interview/end", { replace: true });
      },
      onError ( error ) {
        alert(error);
      },
    });
  };

  return (
    <StyledWrap>
      <InterviewComment>
        <StyledComment>
          {InterviewModeComment.finished}
          <StyledSubmitButton type="button" onClick={handleSubmit}>
            📝 면접 결과 제출하고 나가기
          </StyledSubmitButton>
        </StyledComment>
      </InterviewComment>
    </StyledWrap>
  );
};

export default FinishedModeController;

const StyledWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledComment = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 400;
`;

const StyledSubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: var(--main-white);
  margin-left: 50px;
  transition: all 200ms;
  background-color: var(--main-orange);

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;
