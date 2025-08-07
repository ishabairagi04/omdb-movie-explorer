// In @/types/movie.ts
export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating?: string; // ✅ Add this line
};
