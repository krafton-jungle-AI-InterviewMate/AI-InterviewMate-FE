import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { StyledBtn } from "styles/StyledBtn";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  aiInterviewNextProcessAtom,
  interviewDataAtom,
  isInterviewerAtom,
  timelineRecordAtom,
} from "store/interview/atom";
import { usePostRatingViewee } from "hooks/queries/mypage";
import { deduplicate } from "lib/interview";
import { PostRatingVieweePayloadData } from "api/mypage/types";

import EndCommentForm from "components/interview/EndCommentForm";

const InterviewEnd = () => {
  const setAiInterviewNextProcess = useSetRecoilState(aiInterviewNextProcessAtom);
  const isInterviewer = useRecoilValue(isInterviewerAtom);
  const interviewData = useRecoilValue(interviewDataAtom);
  const {
    timeline: { eyes, attitude },
  } = useRecoilValue(timelineRecordAtom);

  const { mutate: postRatingVieweeMutate } = usePostRatingViewee();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewData?.roomType === "USER" && !isInterviewer && interviewData) {
      const { roomIdx } = interviewData;
      const data: PostRatingVieweePayloadData = {
        eyeTimelines: deduplicate(eyes),
        attitudeTimelines: deduplicate(attitude),
        questionTimelines: [],
        comments: [],
        scripts: [],
      };

      postRatingVieweeMutate({
        roomIdx,
        data,
      });
    }

    setAiInterviewNextProcess("ready");
  }, []);

  return (
    <StyledInterviewEnd>
      <>
        <h2>면접 종료!</h2>
        {interviewData?.roomType === "USER" && isInterviewer ? (
          <EndCommentForm />
        ) : (
          <div className="commonEndContents">
            <p>수고하셨습니다.</p>
            <span>면접 결과는 마이페이지에서 확인하실 수 있습니다.</span>
            <StyledBtn
              width="100px"
              height="32px"
              color="red"
              onClick={() => navigate("/lobby")}
            >
              나가기
            </StyledBtn>
          </div>
        )}
      </>
    </StyledInterviewEnd>
  );
};

const StyledInterviewEnd = styled.div`
  color: var(--main-black);
  h2 {
    margin: 50px 0;
    font-size: 2.4rem;
    font-weight: 500;
  }
  button {
    width: 300px;
    height: 60px;
    font-size: 1.6rem;
    margin-top: 20px;
  }
  .commonEndContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 78px;
    border-radius: 15px;
    border: 2px solid var(--main-black);
    background-color: var(--main-white);
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04));
    p {
      margin: 0px 0px 80px;
      font-size: 2rem;
    }
    span {
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--font-gray);
      margin-bottom: 15px;
    }
  }
  .userEndContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 78px;
    border-radius: 15px;
    border: 1px solid var(--main-gray);
    background-color: var(--main-white);
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04));
    p {
      font-size: 20px;
      margin: 0 0 80px;
    }
    textarea {
      width: 315px;
      height: auto;
      padding: 5px;
      margin-bottom: 100px;
      font-size: 20px;
      font-weight: bold;
      border: 1px solid var(--font-gray);
      border-radius: 7px;
      overflow: hidden;
    }
  }
`;

export default InterviewEnd;
