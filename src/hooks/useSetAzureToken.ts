import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { azureTokenAtom } from "store/auth/atom";

import { useGetAzureToken } from "./queries/auth";

const useSetAzureToken = () => {
  const setAzureToken = useSetRecoilState(azureTokenAtom);

  const {
    data,
    isSuccess,
    isError,
    isFetching,
  } = useGetAzureToken();

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (isSuccess && data) {
      setAzureToken(data.data.token);
    }

    if (isError) {
      console.log("useSetAzureToken Error");
    }
  }, [ isFetching ]);

  return {
    isAzureTokenFetching: isFetching,
    isAzureTokenSuccess: isSuccess,
    isAzureTokenError: isError,
  };
};

export default useSetAzureToken;
