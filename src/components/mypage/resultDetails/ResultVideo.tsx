import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultVideoProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  videoUrl: string;
};

const ResultVideo = (props: ResultVideoProps) => {
  const {
    videoRef,
    videoUrl,
  } = props;

  return (
    <div>
      <StyledTitle>면접 장면 다시보기</StyledTitle>
      <StyledVideoWrapper>
        <video
          ref={videoRef}
          width="640px"
          autoPlay={false}
          loop={false}
          controls
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </StyledVideoWrapper>
    </div>
  );
};

export default ResultVideo;

const StyledTitle = styled.h3`
  margin: 0;
  ${commonLabelStyle}
  padding: 0;
  text-align: left;
`;

const StyledVideoWrapper = styled.div`
  width: 640px;
  height: 480px;
  border-radius: 16px;
  padding: 10px;
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  box-sizing: content-box;
  background-color: var(--main-white);

  & video {
    box-sizing: border-box;
    width: 640px;
    height: 480px;
    border-radius: 10px;
  }
`;
