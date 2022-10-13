import { createContext } from "react";
import { useQuery } from "react-query";
import fetchPosts from "./pages/fetchApi";

interface ApiError {
  message: string;
}

export const ApiContext = createContext<any>(null);

function ApiContextProvider({ children }: any) {
  const { data, error, isError, isLoading } = useQuery<Array<any>, ApiError>("users", fetchPosts);
  return (
    <ApiContext.Provider
      value={{
        data, error, isError, isLoading
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;
