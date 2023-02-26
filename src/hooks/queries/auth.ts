import { useQuery, useMutation } from "@tanstack/react-query";
import authAPI from "api/auth";
import { GetAuthorizationParams } from "api/auth/type";

export const useGetAuthorization = (params: GetAuthorizationParams, enabled: boolean) => {
  const { data, isSuccess, isLoading, isError } = useQuery([ "getAuthorization" ], () => {
    return authAPI.getAuthorization(params);
  }, {
    enabled,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
};

export const useGetRefresh = (enabled: boolean) => {
  const { data, isSuccess, isLoading, isFetching, isError } = useQuery([ "getRefresh" ], () => {
    return authAPI.getRefresh();
  }, {
    enabled,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  };
};

export const useGetMyinfo = (enabled: boolean) => {
  const { data, isSuccess, isLoading, isFetching, isError, refetch } = useQuery([ "getMyinfo" ], () => {
    return authAPI.getMyinfo();
  }, {
    enabled,
  });

  return {
    data,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export const useGetAzureToken = () => {
  const { data, isSuccess, isLoading, isFetching, isError } = useQuery([ "getAzureToken" ], () => {
    return authAPI.getAzureToken();
  });

  return {
    data,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  };
};

export const usePutNickname = () => {
  return useMutation(authAPI.putNickname);
};
