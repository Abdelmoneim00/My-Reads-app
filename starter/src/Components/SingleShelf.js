import React from 'react'
import Book from './SingleBook'

export default function SingleShelf({books, title, setBooks}) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books && books.map((book) => {
                        return <Book key={book.id} books={books} {...book} setBooks={setBooks} />
                    })}

                </ol>
            </div>
        </div>
    )
}