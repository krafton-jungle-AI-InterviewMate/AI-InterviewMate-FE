import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberAtom } from "store/auth/atom";

import useLogout from "hooks/useLogout";
import { useGetMyinfo } from "hooks/queries/auth";

import ProfileUpdatePopup from "components/mypage/ProfileUpdatePopup";
import Popup from "components/common/Popup";

import styled from "@emotion/styled";

const StyledMypage = styled.div`
  width: 1000px;
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: var(--main-black);
  div {
    width: 500px;
    margin-bottom: 100px;
    text-align: left;
    h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    hr {
      width: 250px;
      height: 2px;
      background-color: var(--main-black);
      margin: 2px 0 15px;
      border: none;
    }
    a,
    button.logout,
    button.profile {
      display: block;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      color: var(--font-gray);
      &:hover {
        color: var(--main-blue);
      }
    }
    a:first-of-type {
      margin-bottom: 10px;
    }
    button.logout,
    button.profile {
      background: none;
      padding: 0;
      outline: none;
      border: none;
    }
  }
`;

const Mypage = () => {
  const setMember = useSetRecoilState(memberAtom);
  const [ isProfileUpdatePopupOpen, setIsProfileUpdatePopupOpen ] = useState(false);
  const [ isLogoutPopupOpen, setIsLogoutPopupOpen ] = useState(false);

  const {
    handleLogout,
  } = useLogout();

  const {
    refetch,
    isFetching,
    isSuccess,
    data,
  } = useGetMyinfo(false);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (isSuccess && data) {
      const {
        data: {
          data: {
            idx, nickname, email, authProvider,
          },
        },
      } = data;

      setMember(({ accessToken }) => ({
        accessToken,
        idx,
        nickname,
        email,
        authProvider,
      }));
    }
  }, [ isFetching ]);

  return (
    <StyledMypage>
      {isProfileUpdatePopupOpen && (
        <ProfileUpdatePopup
          open={isProfileUpdatePopupOpen}
          onClose={() => setIsProfileUpdatePopupOpen(false)}
          refetch={refetch}
        />
      )}
      {isLogoutPopupOpen && (
        <Popup
          open={isLogoutPopupOpen}
          onClose={() => setIsLogoutPopupOpen(false)}
          confirmText="네!"
          cancelText="취소"
          onConfirm={handleLogout}
        >
          로그아웃 하시겠습니까?
        </Popup>
      )}
      <div>
        <h2>회원 정보</h2>
        <hr />
        <button type="button" className="profile" onClick={() => setIsProfileUpdatePopupOpen(true)}>
          프로필 수정
        </button>
        <button type="button" className="logout" onClick={() => setIsLogoutPopupOpen(true)}>
          로그아웃
        </button>
      </div>
      <div>
        <h2>인터뷰 관리</h2>
        <hr />
        <Link to="/mypage/result">면접 결과 확인</Link>
        <Link to="/mypage/questions">질문 꾸러미 관리</Link>
      </div>
      <div>
        <h2>고객 센터</h2>
        <hr />
        <a href="mailto:rlarlxo2628@gmail.com">이메일 문의</a>
        <Link to="/*">회원 탈퇴</Link>
      </div>
    </StyledMypage>
  );
};

export default Mypage;
