import OpenViduVideoComponent from "./OvVideo";
import { useRecoilValue } from "recoil";
import { interviewDataAtom } from "store/interview/atom";
import styled from "@emotion/styled";

const UserVideoComponent = ({ streamManager, isInterviewer }) => {
  const interviewData = useRecoilValue(interviewDataAtom);
  return (
    <StyledUserVideoComponent isInterviewer={isInterviewer}>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <p>
            <span className="interviewer">{isInterviewer ? "면접관" : "면접자"}</span>
            <span className="nickname">{streamManager.stream.connection.data.split('"')[3]}</span>
          </p>
        </div>
      ) : null}
    </StyledUserVideoComponent>
  );
};

interface StyledUserVideoComponentProps {
  isInterviewer: boolean;
}

const StyledUserVideoComponent = styled.div<StyledUserVideoComponentProps>`
  margin-bottom: 20px;
  .streamcomponent {
    display: flex;
    flex-direction: ${props => (props.isInterviewer ? "row" : "column")};
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => (props.isInterviewer ? "0 0 0 50px" : "45px 0 0")};
    span {
      display: block;
    }
    .interviewer {
      width: 70px;
      height: 24px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      margin-right: 12px;
      color: var(--main-white);
      background-color: ${props => (props.isInterviewer ? "var(--push-gray)" : "var(--main-blue)")};
    }
    .nickname {
      font-size: 16px;
      font-weight: 500;
      color: var(--main-black);
    }
  }
`;

export default UserVideoComponent;
