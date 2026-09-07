import { useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    { id: 1, title: "John Wick", release_date: "2020" },
    { id: 2, title: "Terminator", release_date: "1999" },
    { id: 3, title: "Matrix", release_date: "1998" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    setSearchQuery(searchTerm);
    console.log(`Searching for: ${searchTerm}`);
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
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
              <MovieCard key={movie.id} movie={movie} />
            ),
        )}
      </div>
    </div>
  );
};

export default Home;
