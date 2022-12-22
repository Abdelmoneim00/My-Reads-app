import "./App.css";
import Search from "./Components/Search";
import { useEffect, useState } from "react";
import Home from "./Components/Home";
import { getAll } from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [onLoad, setonLoad] = useState(false);
  const [books, setBooks] = useState([]);
  let readBooks, currentlyReadingBooks, wantToReadBooks;

  useEffect(() => {
    const getBooks = async () => {
      setonLoad(true);
      let newBooks = await getAll();
      setBooks((prevState) => [...prevState, ...newBooks]);
      setonLoad(false);
    };

    getBooks();
  }, []);

  useEffect(() => {
    readBooks = books.filter((book) => book.shelf === "read");
    wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
    currentlyReadingBooks = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
  }, [books]);

  if (onLoad) {
    return <h2>Getting your books. Please wait...</h2>;
  }
  readBooks = books.filter((book) => book.shelf === "read");
  wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  currentlyReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setonLoad={setonLoad}
              setBooks={setBooks}
              books={books}
              readBooks={readBooks}
              wantToReadBooks={wantToReadBooks}
              currentlyReadingBooks={currentlyReadingBooks}
            />
          }
        ></Route>
        <Route
          path="/search"
          element={<Search setBooks={setBooks} books={books}></Search>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
