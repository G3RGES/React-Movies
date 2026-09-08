import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(false);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
        console.log("Popular movies fetched successfully.");
      }
    };
    fetchPopularMovies();
  }, []);

  // const movies = [
  //   { id: 1, title: "John Wick", release_date: "2020" },
  //   { id: 2, title: "Terminator", release_date: "1999" },
  //   { id: 3, title: "Matrix", release_date: "1998" },
  // ];

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Error searching for movies. Please try again later.");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name="search"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {error && <div className="error">Error: {error.message}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          movies.map(
            (movie) =>
              movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <MovieCard key={movie.id} movie={movie} />
              ),
          )
        )}
      </div>
    </div>
  );
};

export default Home;
