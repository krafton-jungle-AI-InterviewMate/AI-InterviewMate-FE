import styled from "@emotion/styled";
import OpenViduVideoComponent from "./OvVideo";
import { useRecoilValue } from "recoil";
import { interviewDataAtom } from "store/interview/atom";

const UserVideoComponent = ({ streamManager }) => {
  const InterviewData = useRecoilValue(interviewDataAtom);
  return (
    <StyledUserVideoComponent>
      {streamManager !== undefined ? (
        <>
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={streamManager} />
          </div>
          <p>
            <span className="interviewr">면접자</span>
            <span>{InterviewData?.nickname}</span>
          </p>
        </>
      ) : (
        <div className="streamcomponent"></div>
      )}
    </StyledUserVideoComponent>
  );
};

const StyledUserVideoComponent = styled.div`
  p {
    display: flex;
    justify-content: center;
    font-size: 16px;
    span {
      display: block;
    }
  }
  .interviewr {
    width: 70px;
    height: 24px;
    border-radius: 5px;
    margin-right: 12px;
    font-size: 12px;
    background-color: var(--main-blue);
    color: var(--main-white);
  }
`;

export default UserVideoComponent;
