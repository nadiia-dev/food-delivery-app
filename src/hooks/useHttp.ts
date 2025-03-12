import { useCallback, useEffect, useState } from "react";
import { Meal } from "../components/Meals";

type ConfigType = RequestInit;

// interface CustomerData {
//   name: string;
//   email: string;
//   street: string;
//   "postal-code": string;
//   city: string;
// }

// interface RequestBody {
//   order: {
//     items: Meal[];
//     customer: CustomerData;
//   };
// }

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

  const sendRequest = useCallback(
    async function sendRequest(data?: string) {
      setIsLoading(true);
      try {
        const resData = await handleHTTPRequest(url, { ...config, body: data });
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

  return { data, error, isLoading, sendRequest };
};

export default useHttp;
