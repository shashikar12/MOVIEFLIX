const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(request, response) {
  const token = process.env.TMDB_TOKEN || process.env.VITE_APP_TMDB_TOKEN;
  const { path, ...query } = request.query;

  if (!token) {
    return response.status(500).json({ message: "TMDB token is not configured" });
  }

  if (!path || Array.isArray(path) || !path.startsWith("/")) {
    return response.status(400).json({ message: "A valid TMDB path is required" });
  }

  const tmdbUrl = new URL(path, TMDB_BASE_URL);

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => tmdbUrl.searchParams.append(key, item));
    } else if (value !== undefined) {
      tmdbUrl.searchParams.set(key, value);
    }
  });

  try {
    const tmdbResponse = await fetch(tmdbUrl, {
      headers: {
        Authorization: `bearer ${token}`,
        accept: "application/json",
      },
    });
    const body = await tmdbResponse.text();

    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
    response.status(tmdbResponse.status).send(body);
  } catch (error) {
    response.status(502).json({ message: "Unable to reach TMDB" });
  }
}
