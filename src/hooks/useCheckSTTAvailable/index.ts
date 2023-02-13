import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mypageRegex, mypageSubRegex } from "./regex";

const useCheckSTTAvailable = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (mypageRegex.test(pathname) || mypageSubRegex.test(pathname)) {
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      navigate("/not-available");
    }
  }, [ pathname ]);
};

export default useCheckSTTAvailable;
