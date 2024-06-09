import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useGetMovies } from "./useGetMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "f84fc31d";

export default function App() {
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watchedMovies");

  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, isLoading, fetchError } = useGetMovies(
    query /* ,
    handleClearSelection */
  );

  function handleSelectedMovie(id) {
    setSelectedMovieId((sid) => (sid === id ? null : id));
  }
  function handleClearSelection() {
    setSelectedMovieId(null);
  }

  function handleAddWathced(watchedMovie) {
    setWatched((watched) => [...watched, watchedMovie]);
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== movieId)
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && (
            <PreResultScreen className="loader">Loading.</PreResultScreen>
          )}
          {!isLoading && !fetchError}
          {fetchError && (
            <PreResultScreen className="error">🤦‍♂️ {fetchError}</PreResultScreen>
          )}
          {!isLoading && !fetchError && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              selectedMovieId={selectedMovieId}
              onClearSelection={handleClearSelection}
              handleAddWathced={handleAddWathced}
              watchedMovies={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function PreResultScreen({ children, className }) {
  return <p className={className}>{children}</p>;
}

function Results({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const searchBoxFocus = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement !== searchBoxFocus.current) {
      searchBoxFocus.current.focus();
      setQuery("");
    }
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchBoxFocus}
    />
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function SelectedMovie({
  selectedMovieId,
  onClearSelection,
  handleAddWathced,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const isWatchedMovie = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movie;

  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleAddWathced(watchedMovie);
    onClearSelection();
  }

  //asdqwe
  useKey("Escape", onClearSelection);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      //cleanup function
      return function () {
        document.title = "MovieLibrary";
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        const result = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
        );

        console.log(result);
        if (!result.ok)
          throw new Error(
            "Something Happened, please refresh page and try again!"
          );
        const movieDetails = await result.json();
        setMovie(movieDetails);
      }
      //alert(selectedMovieId);
      getMovieDetails();
    },
    [selectedMovieId]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClearSelection}>
          🔙
        </button>
        <img src={poster} alt={`poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>⭐ {imdbRating} IMDb rating</p>
        </div>
      </header>

      <section>
        {isWatchedMovie ? (
          <div className="rating">
            <p>Movie Already in Watched List!</p>
          </div>
        ) : (
          <>
            <div className="rating">
              <StarRating
                size={20}
                maxRating={10}
                onSetRating={setUserRating}
              />
            </div>
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAdd}>
                Add to Watched List
              </button>
            )}
          </>
        )}
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        <p>Directed By: {director}</p>
      </section>
    </div>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
}

/* function WatchedBox({ children }) {
  /* 

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && children}
    </div>
  ); 
} */

function Main({ children }) {
  return <main className="main">{children}</main>;
}
