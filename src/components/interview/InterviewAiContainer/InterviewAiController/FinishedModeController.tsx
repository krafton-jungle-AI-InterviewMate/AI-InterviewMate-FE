import { useNavigate } from "react-router-dom";

import { InterviewModeComment } from "constants/interview";
import InterviewComment from "../InterviewComment";

import { useRecoilValue } from "recoil";
import { answerScriptAtom, motionScoreAtom, irisScoreAtom } from "store/interview/atom";
import { usePostRatingViewee } from "hooks/queries/mypage";
import { PostRatingVieweePayloadData } from "api/mypage/types";
import { AI_VIEWER_IDX } from "constants/api";

import styled from "@emotion/styled";

const FinishedModeController = () => {
  const navigate = useNavigate();

  const motionScore = useRecoilValue(motionScoreAtom);
  const irisScore = useRecoilValue(irisScoreAtom);
  const answerScript = useRecoilValue(answerScriptAtom);

  const {
    mutate,
    isLoading,
  } = usePostRatingViewee();

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }

    const data: PostRatingVieweePayloadData = {
      viewerIdx: AI_VIEWER_IDX, // TODO: user/ai 구분
      eyesRating: irisScore,
      attitudeRating: motionScore,
      scriptRequestsDtos: answerScript.map((script, idx) => ({
        questionIdx: idx + 1, // DB index 1부터 시작
        script,
      })),
    };

    mutate({
      roomIdx: 1, // ! TODO: 실제 roomIdx로 교체
      data,
    }, {
      onSuccess: () => {
        navigate("/interview/end");
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
        </StyledComment>
      </InterviewComment>
      <StyledLayer>
        <StyledSubmitButton type="button" onClick={handleSubmit}>
          📝 면접 결과 제출하고 나가기
        </StyledSubmitButton>
      </StyledLayer>
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

const StyledComment = styled.strong`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 400;
`;

const StyledLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  border-radius: 5px;
  `;

const StyledSubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: var(--main-white);
  background-color: var(--push-orange);
`;
