import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const fetchDataFromApi = async (url, params = {}, signal) => {
  const isProduction = import.meta.env.PROD;
  const requestUrl = isProduction ? "/api/tmdb" : BASE_URL + url;
  const requestParams = isProduction ? { path: url, ...params } : params;
  const headers = isProduction
    ? {}
    : {
        Authorization: "bearer " + TMDB_TOKEN,
      };

  try {
    const { data } = await axios.get(requestUrl, {
      headers,
      params: requestParams,
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
