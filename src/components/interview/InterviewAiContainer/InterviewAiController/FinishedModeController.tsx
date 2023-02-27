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
