import { AiInterviewerTypes } from "types/interview";

const S3_URL = "https://bucket1182644-staging.s3.ap-northeast-2.amazonaws.com/interviewer/";

export const getAiInterviewerMiniThumbnail = (interviewer: AiInterviewerTypes) => {
  return `${S3_URL}${interviewer}_mini.png`;
};

export const getAiInterviewerThumbnail = (interviewer: AiInterviewerTypes) => {
  return `${S3_URL}${interviewer}.png`;
};

export const getAiInterviewerProfile = (interviewer: AiInterviewerTypes) => {
  switch (interviewer) {
  case "Minho":
    return "데이터 엔지니어링 리드: 대용량 데이터 처리와 분석을 위한 기술 경험과 데이터베이스 설계 전문성 보유. 대기업에서 6년 경력.";
  case "Seungmin":
    return "소프트웨어 아키텍트 리드: 창의적이고 혁신적인 시스템 아키텍처를 위한 전문성 보유. 스타트업에서 5년 경력.";
  case "Donghyun":
    return "소프트웨어 엔지니어링 리드: 광범위한 기술 경험과 이해력으로 프로젝트 팀 지원에 능숙. FAANG에서 8년 경력.";
  case "Suhyun":
    return "백엔드 리드 개발자: 분산 시스템 아키텍처 및 데이터베이스 설계 경험 보유. 대기업에서 7년 경력.";
  case "Seoyoung":
    return "프론트엔드 리드 개발자: 유저 경험 개선 및 새로운 프로젝트 구축에 전문성 보유. 스타트업에서 5년 경력.";

  default:
    return "";
  }
};

export const getAiInterviewerVideo = (interviewer: AiInterviewerTypes) => {
  return `${S3_URL}${interviewer}.mp4`;
};

export const getAiInterviewerListening = (interviewer: AiInterviewerTypes) => {
  return `${S3_URL}${interviewer}_listening.mp4`;
};

/**
 * 
 * @param startTime 타임라인을 기록하기 시작한 시간(ms)
 * 
 * @returns "mm:ss" 포맷의 문자열을 반환
 */
export const createTimeline = (startTime: number) => {
  const diff = Date.now() - startTime;
  const sec = Math.round(diff / 1000);

  const mm = Math.floor(sec / 60);
  const ss = sec % 60;

  return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
};

/**
 * 
 * @param videoTime "mm:ss" 포맷의 문자열
 * @returns "mm:ss" 포맷의 문자열을 초 단위로 변환한 숫자를 반환
 */
export const timestampToSeconds = (videoTime: string) => {
  const [ minutes, seconds ] = videoTime.split(":");
  return 60 * Number(minutes) + Number(seconds);
};

export const deduplicate = (list: string[]) => {
  const tempSet = new Set(list);
  return Array.from(tempSet);
};
