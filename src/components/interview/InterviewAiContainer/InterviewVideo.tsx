import { AI_VIDEO_WIDTH } from "constants/interview";

type InterviewVideoProps = {
  videoKey: string;
  className: string;
  src: string;
  isFallback?: boolean;
};

const InterviewVideo = (props: InterviewVideoProps) => {
  const {
    videoKey,
    className,
    src,
    isFallback,
  } = props;

  return (
    <video
      width={AI_VIDEO_WIDTH}
      autoPlay={!isFallback}
      loop
      muted
      key={videoKey}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default InterviewVideo;
