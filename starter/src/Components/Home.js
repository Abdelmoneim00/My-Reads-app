import React from 'react'
import SingleShelf from "./SingleShelf";
import {Link} from 'react-router-dom';


export default function Home({books, currentlyReadingBooks, readBooks, wantToReadBooks, setonLoad, setBooks}) {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {books && (
            <div>
              <SingleShelf
                title={"Currently Reading"}
                books={currentlyReadingBooks}
                setBooks={setBooks}
                setonLoad={setonLoad}
              />
              <SingleShelf
                title={"Want to Read"}
                books={wantToReadBooks}
                setBooks={setBooks}
                setonLoad={setonLoad}
              />
              <SingleShelf
                title={"Read"}
                books={readBooks}
                setBooks={setBooks}
                setonLoad={setonLoad}
              />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search" style={{ cursor: "pointer" }}>
            Add a book
          </Link>
        </div>
      </div>
    </div>
  )
}