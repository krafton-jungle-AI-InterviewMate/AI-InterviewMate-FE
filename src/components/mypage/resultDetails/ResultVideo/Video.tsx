import { useEffect, useRef, useState } from "react";
import videojs, { VideoJsPlayer as Player } from "video.js";
import "video.js/dist/video-js.css";

import HamsterLoader from "components/common/HamsterLoader";

import styled from "@emotion/styled";

type VideoProps = {
  videoRef: React.MutableRefObject<Player | null>;
  options: any;
  onReady: any; // FIXME:
  refetch: () => void;
};

const Video = (props: VideoProps) => {
  const {
    videoRef,
    options,
    onReady,
    refetch,
  } = props;

  const [ isError, setIsError ] = useState(false);

  const parentRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      // Make sure Video.js player is only initialized once
      if (!videoRef.current) {
        const videoElement = document.createElement("video-js");
  
        videoElement.classList.add("vjs-big-play-centered");
        parentRef.current.appendChild(videoElement);
  
        const player = videoRef.current = videojs(videoElement, options, () => {
          videojs.log("player is ready");
          setIsError(false);
          onReady && onReady(player);
        });
        player.on("error", () => setIsError(true));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
      }
      else {
        const player = videoRef.current;
  
        player.autoplay(options.autoplay!);
        player.src(options.sources!);
      }
    }
  }, [ options, parentRef, videoRef ]);

  useEffect(() => {
    const player = videoRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        videoRef.current = null;
      }
    };
  }, [ videoRef ]);

  return isError ? (
    <StyledLoaderWrap className="loaderWrap">
      <HamsterLoader />
      <p>비디오 변환 작업 중입니다..</p>
      <StyledRefetchButton type="button" onClick={refetch}>
        다시 불러오기
      </StyledRefetchButton>
    </StyledLoaderWrap>
  ) : (
    <div data-vjs-player>
      <div ref={parentRef} />
    </div>
  );
};

export default Video;

const StyledLoaderWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledRefetchButton = styled.button`
  background-color: var(--main-gray);
  color: var(--main-white);
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;
