import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";

import Loading from "components/common/Loading";
import ResultDetailsLayout from "components/layout/result/ResultDetailsLayout";
import ResultVideo from "components/mypage/resultDetails/ResultVideo";
import ResultTimeline, { TempResponseType } from "components/mypage/resultDetails/ResultTimeline";
import ResultChartAi from "components/mypage/resultDetails/ResultChartAi";
import ResultChartUser from "components/mypage/resultDetails/ResultChartUser";
import ResultScript from "components/mypage/resultDetails/ResultScript";
import ResultComments from "components/mypage/resultDetails/ResultComments";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const mock_timeline: TempResponseType = {
  timeline: [
    {
      "type": "question",
      "timestamp": "00:02",
    },
    {"type": "eye",
      "timestamp": "00:04",
    },
    {"type": "eye",
      "timestamp": "00:05",
    },
    {"type": "eye",
      "timestamp": "00:06",
    },
    {
      "type": "attitude",
      "timestamp": "00:11",
    },
    {
      "type": "question",
      "timestamp": "00:27",
    },
    {
      "type": "attitude",
      "timestamp": "00:28",
    },
    {
      "type": "attitude",
      "timestamp": "00:29",
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
        {data.data.data.videoUrl ? (
          <>
            <ResultVideo videoRef={videoRef} videoUrl={data.data.data.videoUrl} />
            <ResultTimeline data={mock_timeline} videoRef={videoRef} />
          </>
        ) : (
          <StyledNoVideo>
            <p>녹화된 영상이 없습니다.</p>
          </StyledNoVideo>
        )}
      </StyledVideoSection>
      <StyledChartSection>
        {searchParams.get("type") === "AI"
          ? <ResultChartAi />
          : <ResultChartUser />
        }
        {searchParams.get("type") === "AI"
          ? <ResultScript resultDetail={data.data.data} />
          : <ResultComments />
        }
      </StyledChartSection>
    </ResultDetailsLayout>
  ) : (
    <div>
      <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
    </div>
  );
};

export default ResultDetails;

const commonSectionStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

const StyledVideoSection = styled.div`
  ${commonSectionStyle}
`;

const StyledNoVideo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: var(--main-gray);
  border-radius: 16px;
  opacity: 0.6;

  & p {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: var(--font-gray);
  }
`;

const StyledChartSection = styled.div`
  ${commonSectionStyle}
`;
