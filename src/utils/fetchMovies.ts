export const fetchMovies = async (
  query: string,
  type = "",
  year = "",
  page = 1
) => {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  if (!API_KEY) {
    throw new Error("OMDb API key is missing. Please check your .env file.");
  }

  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("s", query);
  url.searchParams.append("page", page.toString());

  if (type) url.searchParams.append("type", type);
  if (year) url.searchParams.append("y", year);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Unknown error from OMDb API");
  }

  return data;
};
export const fetchMovieById = async (id: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
};
