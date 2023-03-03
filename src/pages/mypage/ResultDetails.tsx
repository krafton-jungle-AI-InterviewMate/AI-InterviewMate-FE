import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";
import Player from "video.js/dist/types/player";

import Loading from "components/common/Loading";
import ResultDetailsLayout from "components/layout/result/ResultDetailsLayout";
import ResultVideo from "components/mypage/resultDetails/ResultVideo";
import ResultTimeline from "components/mypage/resultDetails/ResultTimeline";
import ResultChartAi from "components/mypage/resultDetails/ResultChartAi";
import ResultChartUser from "components/mypage/resultDetails/ResultChartUser";
import ResultScript from "components/mypage/resultDetails/ResultScript";
import ResultComments from "components/mypage/resultDetails/ResultComments";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ResultDetails = () => {
  const [ searchParams ] = useSearchParams();
  const videoRef = useRef<null | Player>(null);

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

  console.log(videoRef.current);

  return isSuccess && data ? (
    <ResultDetailsLayout roomType={searchParams.get("type") as RoomTypes} data={data.data}>
      <StyledVideoSection>
        {data.data.data.videoUrl ? (
          <>
            <ResultVideo videoRef={videoRef} videoUrl={data.data.data.videoUrl} />
            <ResultTimeline data={data.data.data.timelines} videoRef={videoRef} />
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
