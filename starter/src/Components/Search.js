import { useState, useEffect } from "react";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";
import SingleBook from "./SingleBook";


function Search({ setBooks, books }) {
  const [Results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length === 0) setResults([]);
    setResults([]);
    const getSearchBooks = async () => {
      console.log(searchQuery);
      let searchBooks = await search(...searchQuery.split(' '), 20);
      try {
        if (searchBooks.error === "empty query" || !searchBooks) {
          console.log("empty query");
        } else {
          for (let i = 0; i < searchBooks.length; i++) {
            searchBooks[i].shelf = "noValue";
            for (let j = 0; j < books.length; j++) {
              if (searchBooks[i].id === books[j].id) {
                searchBooks[i].shelf = books[j].shelf;
              }
            }
          }
        }
        setResults(searchBooks);
      }
      catch (err) { }
    };
    getSearchBooks();
  }, [searchQuery,]);


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {Results.length <= 0 && <h2>No matches..</h2>}
        <ol className="books-grid">
          {Results && Results.map((book) => <SingleBook key={book.id} {...book} setBooks={setBooks} />)}
        </ol>
      </div>
    </div>
  );
}

export default Search;