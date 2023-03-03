import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer as Player } from "video.js";
import "video.js/dist/video-js.css";

type VideoProps = {
  videoRef: React.MutableRefObject<Player | null>;
  options: any; // FIXME:
  onReady: any; // FIXME:
};

const Video = (props: VideoProps) => {
  const {
    videoRef,
    options,
    onReady,
  } = props;

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
          onReady && onReady(player);
        });
  
      // You could update an existing player in the `else` block here
      // on prop change, for example:
      }
      else {
        const player = videoRef.current;
  
        player.autoplay(options.autoplay);
        player.src(options.sources);
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

  return (
    <div data-vjs-player>
      <div ref={parentRef} />
    </div>
  );
};

export default Video;
