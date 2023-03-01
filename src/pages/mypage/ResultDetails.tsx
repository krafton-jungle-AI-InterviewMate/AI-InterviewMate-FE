import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";

import Loading from "components/common/Loading";
import ResultDetailsLayout from "components/layout/result/ResultDetailsLayout";
import ResultVideo from "components/mypage/resultDetails/ResultVideo";
import ResultTimeline, { TempResponseType } from "components/mypage/resultDetails/ResultTimeline";

import styled from "@emotion/styled";

// FIXME: 실제 데이터로 교체
const mock_video_url = "https://bucket1182644-staging.s3.ap-northeast-2.amazonaws.com/interviewer/Seungmin.mp4";
const mock_timeline: TempResponseType = {
  timeline: [
    {
      "type": "question",
      "timestamp": "00:04",
    },
    {"type": "eye",
      "timestamp": "00:07",
    },
    {
      "type": "attitude",
      "timestamp": "00:11",
    },
  ],
};

const ResultDetails = () => {
  const [ searchParams ] = useSearchParams();
  const videoRef = useRef<null | HTMLVideoElement>(null);

  const {
    data,
    isFetching,
    isSuccess,
  } = useGetRatingDetail(
    Number(searchParams.get("room")),
    searchParams.get("type") as RoomTypes,
  );

  if (isFetching) {
    return <Loading margin="0" />;
  }

  return isSuccess && data ? (
    <ResultDetailsLayout roomType={searchParams.get("type") as RoomTypes} data={data.data}>
      <StyledVideoSection>
        <ResultVideo videoRef={videoRef} videoUrl={mock_video_url} />
        <ResultTimeline data={mock_timeline} videoRef={videoRef} />
      </StyledVideoSection>
    </ResultDetailsLayout>
  ) : (
    <div>
      <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
    </div>
  );
};

export default ResultDetails;

const StyledVideoSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;
