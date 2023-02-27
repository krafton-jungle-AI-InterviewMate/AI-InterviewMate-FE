import styled from "@emotion/styled";
import OpenViduVideoComponent from "./OvVideo";
import { useRecoilValue } from "recoil";
import { interviewDataAtom } from "store/interview/atom";

const UserVideoComponent = ({ streamManager, isInterviewer }) => {
  const InterviewData = useRecoilValue(interviewDataAtom);
  return (
    <StyledUserVideoComponent isInterviewer={isInterviewer}>
      {streamManager !== undefined ? (
        <>
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={streamManager} />
          </div>
          <p>
            <span className="interviewr">{isInterviewer ? "면접관" : "면접자"}</span>
            <span>{InterviewData?.nickname}</span>
          </p>
        </>
      ) : (
        <div className="streamcomponent"></div>
      )}
    </StyledUserVideoComponent>
  );
};

interface StyledUserVideoComponentProps {
  isInterviewer: boolean;
}

const StyledUserVideoComponent = styled.div<StyledUserVideoComponentProps>`
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
    background-color: ${props => (props.isInterviewer ? "var(--push-gray)" : "var(--main-blue)")};
    color: var(--main-white);
  }
`;

export default UserVideoComponent;
