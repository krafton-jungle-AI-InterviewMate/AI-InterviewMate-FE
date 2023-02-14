import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * React-Query Options
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 1,
      staleTime: 1000 * 30,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * React-Query Component Provider
 */
const QueryProvider = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
