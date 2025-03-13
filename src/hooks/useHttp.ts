import { useCallback, useEffect, useState } from "react";
import { Meal } from "../components/Meals";

type ConfigType = RequestInit;

const firebaseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const handleHTTPRequest = async (url: string, config?: ConfigType) => {
  const resp = await fetch(url, config);

  const resData = await resp.json();

  if (!resp.ok) {
    throw new Error("Something went wrong");
  }
  return resData;
};

const useHttp = ({ url, config }: { url: string; config?: ConfigType }) => {
  const [data, setData] = useState<Meal[]>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function clearData() {
    setData([]);
  }

  const sendRequest = useCallback(
    async function sendRequest(data?: string) {
      setIsLoading(true);
      try {
        const fullUrl = `${firebaseUrl}/${url}.json`;
        const resData = await handleHTTPRequest(fullUrl, {
          ...config,
          body: data,
        });
        setData(resData);
        setError("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Unexpected error");
        }
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config)
      sendRequest();
  }, [sendRequest, config]);

  return { data, error, isLoading, sendRequest, clearData };
};

export default useHttp;
