import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { accessTokenCookies } from "lib/cookies";

const Redirect = () => {
  // TODO:
  // 1. if (쿼리스트링에 토큰이 잘 담겨있다면)
  // 2. 쿠키에 토큰 저장 후 리다이렉트
  // accessTokenCookies.set(accessToken, expireDate);
  return (
    <div>
      <p>TODO</p>
    </div>
  );
};

export default Redirect;
