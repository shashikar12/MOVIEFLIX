import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url, {}, controller.signal)
      .then((res) => {
        if (!res) return;
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong!");
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
