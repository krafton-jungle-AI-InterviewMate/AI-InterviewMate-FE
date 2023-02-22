import { AiInterviewerTypes } from "types/interview";

import MinhoThumbnail from "static/images/interviewer/Minho.png";
import SeungminThumbnail from "static/images/interviewer/Seungmin.png";
import DonghyunThumbnail from "static/images/interviewer/Donghyun.png";
import SuhyunThumbnail from "static/images/interviewer/Suhyun.png";
import SeoyoungThumbnail from "static/images/interviewer/Seoyoung.png";
import JeonghanThumbnail from "static/images/interviewer/Jeonghan.png";
import HyunsooThumbnail from "static/images/interviewer/Hyunsoo.png";
import SeunghyunThumbnail from "static/images/interviewer/Seunghyun.png";

import MinhoVideo from "static/images/interviewer/Minho.mp4";
import SeungminVideo from "static/images/interviewer/Seungmin.mp4";
import DonghyunVideo from "static/images/interviewer/Donghyun.mp4";
import SuhyunVideo from "static/images/interviewer/Suhyun.mp4";
import SeoyoungVideo from "static/images/interviewer/Seoyoung.mp4";
import JeonghanVideo from "static/images/interviewer/Jeonghan.mp4";
import HyunsooVideo from "static/images/interviewer/Hyunsoo.mp4";
import SeunghyunVideo from "static/images/interviewer/Seunghyun.mp4";

import MinhoListening from "static/images/interviewer/Minho_listening.mp4";
import SeungminListening from "static/images/interviewer/Seungmin_listening.mp4";
import DonghyunListening from "static/images/interviewer/Donghyun_listening.mp4";
import SuhyunListening from "static/images/interviewer/Suhyun_listening.mp4";
import SeoyoungListening from "static/images/interviewer/Seoyoung_listening.mp4";
import JeonghanListening from "static/images/interviewer/Jeonghan_listening.mp4";
import HyunsooListening from "static/images/interviewer/Hyunsoo_listening.mp4";
import SeunghyunListening from "static/images/interviewer/Seunghyun_listening.mp4";

export const getAiInterviewerThumbnail = (interviewer: AiInterviewerTypes) => {
  switch (interviewer) {
  case "Minho":
    return MinhoThumbnail;
  case "Seungmin":
    return SeungminThumbnail;
  case "Donghyun":
    return DonghyunThumbnail;
  case "Suhyun":
    return SuhyunThumbnail;
  case "Seoyoung":
    return SeoyoungThumbnail;
  case "Jeonghan":
    return JeonghanThumbnail;
  case "Hyunsoo":
    return HyunsooThumbnail;
  case "Seunghyun":
    return SeunghyunThumbnail;

  default:
    return MinhoThumbnail;
  }
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
  switch (interviewer) {
  case "Minho":
    return MinhoVideo;
  case "Seungmin":
    return SeungminVideo;
  case "Donghyun":
    return DonghyunVideo;
  case "Suhyun":
    return SuhyunVideo;
  case "Seoyoung":
    return SeoyoungVideo;
  case "Jeonghan":
    return JeonghanVideo;
  case "Hyunsoo":
    return HyunsooVideo;
  case "Seunghyun":
    return SeunghyunVideo;

  default:
    return MinhoVideo;
  }
};

export const getAiInterviewerListening = (interviewer: AiInterviewerTypes) => {
  switch (interviewer) {
  case "Minho":
    return MinhoListening;
  case "Seungmin":
    return SeungminListening;
  case "Donghyun":
    return DonghyunListening;
  case "Suhyun":
    return SuhyunListening;
  case "Seoyoung":
    return SeoyoungListening;
  case "Jeonghan":
    return JeonghanListening;
  case "Hyunsoo":
    return HyunsooListening;
  case "Seunghyun":
    return SeunghyunListening;

  default:
    return MinhoListening;
  }
};
