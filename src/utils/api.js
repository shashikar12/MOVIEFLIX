import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params = {}, signal) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
      signal,
    });
    return data;
  } catch (err) {
    if (axios.isCancel(err) || err.name === "CanceledError") {
      return null;
    }
    throw err;
  }
};
