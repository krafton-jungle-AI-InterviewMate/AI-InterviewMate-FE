import { useSearchParams } from "react-router-dom";
import { useGetRatingDetail } from "hooks/queries/mypage";
import { RoomTypes } from "api/mypage/types";
import { formatDate } from "lib/format";

import ResultTable from "components/mypage/ResultTable";
import Loading from "components/common/Loading";

import styled from "@emotion/styled";

const ResultDetails = () => {
  const [ searchParams ] = useSearchParams();

  const {
    data,
    isFetching,
    isSuccess,
  } = useGetRatingDetail(
    Number(searchParams.get("room")),
    searchParams.get("type") as RoomTypes,
  );

  if (isFetching) {
    return (
      <StyledWrapper>
        <Loading margin="0" />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      {isSuccess && data ? (
        <>
          <StyledHeader>
            <div className="left-section">
              <div className="left-section__role-tag">
                <span>
                  {searchParams.get("type") as RoomTypes === "USER" ? "유저" : "AI"} 면접관
                </span>
              </div>
              <h2>
                {data.data.data.roomName}
              </h2>
            </div>
            <div className="right-section">
              <p className="right-section__time">
                {formatDate(data.data.data.createdAt)} 면접
              </p>
              <p className="right-section__option">
                질문 개수: {data.data.data.roomQuestionNum}개
              </p>
            </div>
          </StyledHeader>
          <ResultTable data={data.data} />
        </>
      ) : (
        <div>
          <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
        </div>
      )}
    </StyledWrapper>
  );
};

export default ResultDetails;

const StyledWrapper = styled.section`
  width: 900px;
  margin-top: 70px;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 56px;

  .left-section {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &__role-tag {
      width: 100px;
      height: 24px;
      background-color: var(--push-gray);
      border-radius: 5px;

      & span {
        font-size: 12px;
        color: var(--main-white);
      }
    }

    & h2 {
      margin: 0;
      margin-left: 13px;
      font-weight: 500;
      font-size: 24px;
    }
  }

  .right-section {
    font-size: 14px;
    text-align: right;

    & p {
      margin: 0;
      padding: 0;
    }

    &__time {
      color: var(--main-black);
    }
    &__option {
      color: var(--font-gray);
    }
  }
`;
