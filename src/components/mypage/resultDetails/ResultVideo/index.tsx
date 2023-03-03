import videojs from "video.js";
import Player from "video.js/dist/types/player";
import Video from "./Video";

import styled from "@emotion/styled";
import { commonLabelStyle } from "styles/resultDetails";

type ResultVideoProps = {
  videoRef: React.MutableRefObject<Player | null>;
  videoUrl: string;
};

const ResultVideo = (props: ResultVideoProps) => {
  const {
    videoRef,
    videoUrl,
  } = props;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: false,
    fluid: true,
    sources: [ {
      src: videoUrl,
      type: "application/x-mpegURL",
    } ],
    width: 640,
    height: 480,
  };

  const handlePlayerReady = (player: Player) => {
    videoRef.current = player;
  };

  return (
    <div>
      <StyledTitle>면접 장면 다시보기</StyledTitle>
      <StyledVideoWrapper>
        <Video
          videoRef={videoRef}
          options={videoJsOptions}
          onReady={handlePlayerReady}
        />
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
