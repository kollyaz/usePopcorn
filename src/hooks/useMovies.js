import { useState, useEffect } from "react";

// console.log("ENV VARIABLES:", process.env);
// console.log("OMDb KEY in useMovies:", process.env.REACT_APP_OMDB_API_KEY);

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = process.env.REACT_APP_OMDB_API_KEY;

  // console.log("OMDb Key:", KEY);

  useEffect(() => {
    // callback?.();

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong fetching movies");

        const data = await res.json();
        if (data.Response === "False")
          throw new Error(data.Error || "Something went wrong fetching movies");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, KEY]);

  return { movies, loading, error };
}
