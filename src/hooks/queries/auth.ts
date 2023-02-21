import { useQuery } from "@tanstack/react-query";
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
  const { data, isSuccess, isLoading, isError } = useQuery([ "getRefresh" ], () => {
    return authAPI.getRefresh();
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
