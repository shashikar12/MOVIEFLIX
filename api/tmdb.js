const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(request, response) {
  const token = process.env.TMDB_TOKEN || process.env.VITE_APP_TMDB_TOKEN;
  const requestUrl = new URL(
    request.url,
    `https://${request.headers.host || "movieflix.local"}`
  );
  const body =
    typeof request.body === "string"
      ? JSON.parse(request.body || "{}")
      : request.body || {};
  const endpoint = body.endpoint || requestUrl.searchParams.get("endpoint");
  const params = body.params || {};

  if (!token) {
    return response.status(500).json({ message: "TMDB token is not configured" });
  }

  if (!endpoint) {
    return response
      .status(400)
      .json({ message: "A valid TMDB endpoint is required" });
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const tmdbUrl = new URL(normalizedEndpoint, TMDB_BASE_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => tmdbUrl.searchParams.append(key, item));
    } else if (value !== undefined && value !== null) {
      tmdbUrl.searchParams.set(key, value);
    }
  });

  requestUrl.searchParams.forEach((value, key) => {
    if (key !== "endpoint") tmdbUrl.searchParams.append(key, value);
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
