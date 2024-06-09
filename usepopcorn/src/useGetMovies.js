import { useEffect, useState } from "react";

export function useGetMovies(query) {
  const KEY = "f84fc31d";
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      //callback?.();

      const controller = new AbortController();
      async function getMovies() {
        try {
          setIsLoading(true);
          setFetchError("");
          const result = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!result.ok)
            throw new Error(
              "Something Happened, please refresh page and try again!"
            );
          const searchedMovieList = await result.json();
          if (searchedMovieList.Response !== "False") {
            setMovies(searchedMovieList.Search);
            setFetchError("");
          } else {
            throw new Error(searchedMovieList.Error);
          }
        } catch (error) {
          if (error.name !== "AbortError") setFetchError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);

        setFetchError(
          "Please type at least 3 characters to start movie search!"
        );
        //console.log("cald2");
      } else {
        getMovies();

        //cleanup function
        return function () {
          controller.abort();
        };
      }
    },
    [query]
  );

  return { movies, isLoading, fetchError };
}
