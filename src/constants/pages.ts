export const PagesPath = {
  INDEX: "/",
  MYPAGE: "/mypage",
  RESULT: "/mypage/result",
  RESULT_DETAILS: "/mypage/result/details",
  QUESTIONS: "/mypage/questions",
  INTERVIEW_AI: "/interview/ai",
  INTERVIEW_READY: "/interview/ready",
  INTERVIEW_END: "/interview/end",
  LOBBY: "/lobby",
  LOGIN: "/login",
  REDIRECT_URI: "/oauth/redirect",
} as const;

// ! Breadcrumbs를 나타내는 경우에만 추가해주세요.
export const PagesName = {
  "/lobby": "로비",
  "/login": "로그인",

  /** 마이페이지 */
  "/mypage": "마이페이지",
  "/mypage/result": "면접 결과 확인",
  "/mypage/result/details": "상세 페이지",
  "/mypage/questions": "질문 꾸러미 관리",

  /** 면접방 */
  "/interview/ready": "면접 대기방",
  "/interview/end": "면접 종료",
} as const;
