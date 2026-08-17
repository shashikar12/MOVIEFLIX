import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const fetchDataFromApi = async (url, params = {}, signal) => {
  const isProduction = import.meta.env.PROD;
  const query = new URLSearchParams(params).toString();
  const endpoint = url.replace(/^\//, "");
  const endpointWithQuery = query
    ? `${endpoint}${endpoint.includes("?") ? "&" : "?"}${query}`
    : endpoint;
  const requestUrl = isProduction
    ? `/api/tmdb/${encodeURIComponent(endpointWithQuery)}`
    : BASE_URL + url;
  const headers = isProduction
    ? {}
    : {
        Authorization: "bearer " + TMDB_TOKEN,
      };

  try {
    const { data } = await axios.get(requestUrl, {
      headers,
      params: isProduction ? {} : params,
      signal,
      timeout: 12000,
    });
    return data;
  } catch (err) {
    if (axios.isCancel(err) || err.name === "CanceledError") {
      return null;
    }
    throw err;
  }
};
