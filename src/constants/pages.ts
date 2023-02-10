export const PagesPath = {
  INDEX: "/",
  MYPAGE: "/mypage",
  INTERVIEW_READY: "/interview/ready",
} as const;

export const PagesName = {
  /** 마이페이지 */
  "/mypage": "마이페이지",
  "/mypage/result": "면접 결과 확인",
  "/mypage/result/details": "상세 페이지",

  /** 면접방 */
  "/interview/ready": "면접 대기방",
} as const;
